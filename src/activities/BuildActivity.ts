import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { ShipData } from "@/models/ShipData";
import { UnknownData } from "@/models/UnknownData";
import StationComponentService from "@/services/StationComponentService";
import StationComponentData from "@/models/StationComponentsData";
import StationService from "@/services/StationService";
import { StationComponentCostAndRequirements } from "@/models/CostAndRequirements/StationComponents";

export default class implements IActivityHandler {
  constructor(
    private readonly shipService: ShipService,
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
        case "ShipData": {
          await this.shipService.createShip(
            parent.Station.playerId,
            parent.Station.id,
            activityWorker.Activity?.data as ShipData
          );

          await this.activityService.delete(activityWorker.Activity.id);
          return;
        }
        case "StationComponentData": {
          await this.stationComponentService.buildComponent(
            parent.Station.id,
            activityWorker.Activity?.data as StationComponentData
          );
          await this.activityService.delete(activityWorker.Activity.id);
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

  async begin<T extends StationComponentData>(
    activityWorkerId: string,
    data: T & UnknownData
  ): Promise<void> {
    if (data.dataType !== "StationComponentData") {
      throw new Error("Wrong data provided");
    }

    const activityWorker = await this.activityService.getWorker(
      activityWorkerId
    );
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

    await this.stationService.consumeFromCargoHold(stationId, target.cost);

    await this.activityService.create(
      activityWorkerId,
      "BUILD",
      NowAddSeconds(3),
      data
    );
  }
}
