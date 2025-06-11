import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { ShipData } from "@/models/ShipData";

export default class implements IActivityHandler {
  constructor(
    private readonly shipService: ShipService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    if (!activityWorker.Activity) {
      throw Error("No activity for this activity worker");
    }

    const parent = await this.activityService.get(activityWorker.id);
    if (parent.Station) {
      await this.shipService.createShip(
        parent.Station.playerId,
        parent.Station.id,
        activityWorker.Activity?.data as ShipData
      );

      await this.activityService.deleteActivity(activityWorker.Activity.id);
      return;
    }

    throw Error("Only stations can build");
  }

  async begin(activityWorkerId: string, data: ShipData): Promise<void> {
    await this.activityService.create(
      activityWorkerId,
      "BUILD",
      NowAddSeconds(3),
      data
    );
  }
}
