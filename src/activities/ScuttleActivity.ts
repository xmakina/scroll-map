import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { IActivityHandler } from "./IActivityHandler";
import { ActivityType } from "@prisma/client";

export default class implements IActivityHandler {
  constructor(
    private readonly shipService: ShipService,
    private readonly stationService: StationService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity) {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }
    const parent = await this.activityService.getWorker(activityWorker.id);
    if (parent.Ship) {
      // TODO: Refund ship cost, place cargo hold somewhere safe?
      await this.shipService.delete(parent.Ship.id);
      await this.activityService.delete(activity.id);
      return;
    }
    throw Error("Only ships can be scuttled");
  }

  async begin(activityWorkerId: string) {
    await this.activityService.create(
      activityWorkerId,
      ActivityType.SCUTTLE,
      NowAddSeconds(3)
    );
  }
}
