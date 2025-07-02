import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import StationComponentService from "@/services/StationComponentService";
import StationService from "@/services/StationService";
import BuildActivityData from "@/models/JsonData/BuildActivityData";
import getJsonData from "@/utils/getJsonData";
import { StationComponentType } from "@prisma/client";

export default class implements IActivityHandler {
  constructor(
    private readonly stationComponentService: StationComponentService,
    private readonly stationService: StationService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    if (!activityWorker.Activity) {
      throw Error("No activity for this activity worker");
    }

    const parent = await this.activityService.getWorker(activityWorker.id);
    const data: BuildActivityData<string> = getJsonData(
      activityWorker.Activity.data
    );

    if (parent.Station) {
      await this.stationComponentService.buildComponent(
        parent.Station.id,
        data.type as StationComponentType
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
    const stationId = activityWorker.Station?.id;
    if (!stationId) {
      throw new Error("Only Stations can build");
    }

    const { cost } = data;
    await this.stationService.consumeFromCargoHold(stationId, cost);
    await this.activityService.create(activityWorkerId, "BUILD", 3, data);
  }
}
