import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ShipService from "@/services/ShipService";
import ActivityService from "@/services/ActivityService";
import BerthData from "@/models/BerthData";
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
      throw new Error("Only ships can berth");
    }

    const shipId = parent.Ship?.id;

    await this.shipService.updateBerthed(shipId, true);
  }

  async begin(activityWorkerId: string, data?: BerthData): Promise<void> {
    await this.activityService.create(
      activityWorkerId,
      ActivityType.BERTH,
      1,
      data
    );
  }
}
