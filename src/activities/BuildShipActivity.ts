import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import { ShipDataWithCost } from "@/models/CostAndRequirements/StationShips";
import ActivityService from "@/services/ActivityService";
import StationService from "@/services/StationService";
import ShipService from "@/services/ShipService";
import { ActivityType } from "@prisma/client";
import getJsonData from "@/utils/getJsonData";

export default class implements IActivityHandler {
  constructor(
    private readonly activityService: ActivityService,
    private readonly stationService: StationService,
    private readonly shipService: ShipService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    if (!activityWorker.Activity) {
      throw Error("No activity for this activity worker");
    }

    const parent = await this.activityService.getWorker(activityWorker.id);

    if (!parent.Station) {
      throw new Error("Only stations can claim Build Ship activities");
    }

    await this.shipService.createShip(
      parent.Station.playerId,
      parent.Station.id,
      getJsonData(activityWorker.Activity?.data)
    );
  }

  async begin(activityWorkerId: string, data: ShipDataWithCost): Promise<void> {
    const activityWorker = await this.activityService.getWorker(
      activityWorkerId
    );
    const stationId = activityWorker.Station?.id;
    if (!stationId) {
      throw new Error("Only Stations can build");
    }

    await this.stationService.consumeFromCargoHold(
      stationId,
      data.costAndRequirements.cost
    );

    await this.activityService.create(
      activityWorkerId,
      ActivityType.BuildShip,
      3,
      data.data
    );
  }
}
