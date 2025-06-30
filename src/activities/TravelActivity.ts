import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import TravelData from "@/models/TravelData";
import { ActivityType } from "@prisma/client";

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

    const parent = await this.activityService.getWorker(activityWorker.id);
    if (!parent.Ship) {
      throw new Error("Only ships can travel");
    }
    const shipId = parent.Ship?.id;
    const newLocationId = (parent.Activity?.data as TravelData).locationId;

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
