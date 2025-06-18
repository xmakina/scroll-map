import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import { ShipData } from "@/models/ShipData";
import { UnknownData } from "@/models/UnknownData";
import StationComponentService from "@/services/StationComponentService";
import StationComponentData from "@/models/StationComponentsData";
import StationService from "@/services/StationService";
import { StationComponentCostAndRequirements } from "@/models/CostAndRequirements/StationComponents";

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
    const dataType = (activityWorker.Activity.data as UnknownData).dataType;

    if (parent.Station) {
      switch (dataType) {
        case "StationComponentData": {
          await this.stationComponentService.buildComponent(
            parent.Station.id,
            activityWorker.Activity?.data as StationComponentData
          );
          return;
        }
        default:
          throw Error(
            `Stations cannot support this kind of construction ${dataType}`
          );
      }
    }

    throw Error("Only stations can build");
  }

  async begin<T extends StationComponentData | ShipData>(
    activityWorkerId: string,
    data: T & UnknownData
  ): Promise<void> {
    switch (data.dataType) {
      case "StationComponentData":
        return beginStationComponent(
          this.activityService,
          this.stationService,
          activityWorkerId,
          data as StationComponentData
        );
      default:
        throw new Error(`Wrong data provided: ${data.dataType}`);
    }
  }
}

async function beginStationComponent(
  activityService: ActivityService,
  stationService: StationService,
  activityWorkerId: string,
  data: StationComponentData & UnknownData
) {
  const activityWorker = await activityService.getWorker(activityWorkerId);
  const stationId = activityWorker.Station?.id;
  if (!stationId) {
    throw new Error("Only Stations can build");
  }

  const { type: componentType, level } = data;

  const target = StationComponentCostAndRequirements[componentType][level];

  if (!target) {
    throw new Error(
      `Station Component ${componentType} at level ${level} does not exist`
    );
  }

  await stationService.consumeFromCargoHold(stationId, target.cost);

  await activityService.create(
    activityWorkerId,
    "BUILD",
    3,
    data
  );
}
