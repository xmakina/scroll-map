import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import StationComponentService from "@/services/StationComponentService";
import StationComponentData from "@/models/JsonData/StationComponentData";
import StationService from "@/services/StationService";
import { StationComponentCostsAndRequirements } from "@/models/CostAndRequirements/StationComponents";
import getJsonData from "@/utils/getJsonData";

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

    if (parent.Station) {
      await this.stationComponentService.buildComponent(
        parent.Station.id,
        getJsonData<StationComponentData>(activityWorker.Activity?.data)
      );
    }

    throw Error("Only stations can build");
  }

  async begin(
    activityWorkerId: string,
    data: StationComponentData
  ): Promise<void> {
    const activityWorker = await this.activityService.getWorker(
      activityWorkerId
    );
    const stationId = activityWorker.Station?.id;
    if (!stationId) {
      throw new Error("Only Stations can build");
    }

    const { type: componentType, level } = data;

    const target = StationComponentCostsAndRequirements[componentType][level];

    if (!target) {
      throw new Error(
        `Station Component ${componentType} at level ${level} does not exist`
      );
    }

    await this.stationService.consumeFromCargoHold(stationId, target.cost);
    await this.activityService.create(activityWorkerId, "BUILD", 3, data);
  }
}
