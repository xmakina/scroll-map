import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ShipService from "@/services/ShipService";
import ActivityService from "@/services/ActivityService";
import BerthData from "@/models/JsonData/BerthData";
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

    const parent = await this.activityService.getWorker(activityWorker.id);
    if (!parent.Ship) {
      throw new Error("Only ships can berth");
    }

    const shipId = parent.Ship.id;

    const data = getJsonData<BerthData>(activity.data);

    await this.shipService.updateBerthed(shipId, true, data.location);
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
