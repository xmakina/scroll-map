import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import TravelData from "@/models/JsonData/TravelData";
import { ActivityType } from "@prisma/client";
import getJsonData from "@/utils/getJsonData";

export default class implements IActivityHandler {
  constructor(
    private readonly shipService: ShipService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }

    const shipId = await this.activityService.getShipFromActivityWorker(
      activityWorker
    );
    const newLocationId = getJsonData<TravelData>(activity.data).locationId;
    await this.shipService.updateLocation(shipId, newLocationId);
  }

  async begin(activityWorkerId: string, data?: TravelData): Promise<void> {
    await this.activityService.create(
      activityWorkerId,
      ActivityType.TRAVEL,
      1,
      data
    );
  }
}
