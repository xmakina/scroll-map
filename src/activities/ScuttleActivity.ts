import { ShipData } from "@/models/ShipData";
import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { IActivityHandler } from "./IActivityHandler";

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
    const parent = await this.activityService.get(activityWorker.id);
    if (parent.Ship) {
      // TODO: Refund ship cost, place cargo hold somewhere safe?
      const shipData = parent.Ship.data as ShipData;
      if (shipData.tug?.stationId) {
        await this.stationService.setTugDeployed(shipData.tug.stationId, false);
      }
      await this.shipService.delete(parent.Ship.id);
      await this.activityService.deleteActivity(activity.id);
      return;
    }
    throw Error("Only ships can be scuttled");
  }

  async begin(activityWorkerId: string) {
    const duration = 3;
    await this.activityService.create(
      activityWorkerId,
      "SCUTTLE",
      NowAddSeconds(duration)
    );
  }
}
