import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import BuildActivityData from "@/models/JsonData/BuildActivityData";
import getJsonData from "@/utils/getJsonData";
import { OutpostComponentType, StationComponentType } from "@prisma/client";
import CargoHoldService from "@/services/CargoHoldService";
import StationComponentService from "@/services/StationComponentService";
import OutpostComponentService from "@/services/OutpostComponentService";

export default class implements IActivityHandler {
  constructor(
    private readonly stationComponentService: StationComponentService,
    private readonly outpostComponentService: OutpostComponentService,
    private readonly cargoHoldService: CargoHoldService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    if (!activityWorker.Activity) {
      throw Error("No activity for this activity worker");
    }

    const parent = await this.activityService.getWorker(activityWorker.id);

    if (parent.Station) {
      const data: BuildActivityData<StationComponentType> = getJsonData(
        activityWorker.Activity.data
      );
      return await this.stationComponentService.buildComponent(
        parent.Station.id,
        data.type
      );
    }

    if (parent.Outpost) {
      const data: BuildActivityData<OutpostComponentType> = getJsonData(
        activityWorker.Activity.data
      );
      return await this.outpostComponentService.buildComponent(
        parent.Outpost.id,
        data.type
      );
    }

    throw Error("Only stations can build");
  }

  async begin<T extends string>(
    activityWorkerId: string,
    data: BuildActivityData<T>
  ): Promise<void> {
    const activityWorker = await this.activityService.getWorker(
      activityWorkerId
    );

    const cargoHoldId =
      activityWorker.Station?.cargoHoldId ??
      activityWorker.Outpost?.cargoHoldId;

    if (!cargoHoldId) {
      throw new Error("This entity does not have a cargo hold");
    }

    const { cost } = data;

    await this.cargoHoldService.consumeCost(cargoHoldId, cost);

    await this.activityService.create(activityWorkerId, "BUILD", 3, data);
  }
}
