import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import findCargoHoldId from "@/utils/findCargoHoldId";
import CargoHoldService from "@/services/CargoHoldService";
import getJsonData from "@/utils/getJsonData";
import MiningData from "@/models/JsonData/MiningData";

export default class implements IActivityHandler {
  constructor(
    private readonly cargoHoldService: CargoHoldService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }

    const parent = await this.activityService.getWorker(activityWorker.id);
    const cargoHoldId = findCargoHoldId(parent);

    const type = getJsonData<MiningData>(activity.data).type;
    await this.cargoHoldService.provide(cargoHoldId, [{ type, amount: 500 }]);
  }

  async begin(activityWorkerId: string, data?: MiningData): Promise<void> {
    await this.activityService.create(activityWorkerId, "MINE", 1, {
      ...data,
      dataType: "MiningData",
    });
  }
}
