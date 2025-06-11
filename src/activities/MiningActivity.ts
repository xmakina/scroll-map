import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import PlanetFromId from "@/utils/PlanetFromId";
import ActivityService from "@/services/ActivityService";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { MiningData } from "@/models/MiningData";

export default class implements IActivityHandler {
  constructor(private readonly activityService: ActivityService) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    console.log("claiming", activityWorker.id);
    throw new Error("Method not implemented.");
  }

  async begin(activityWorkerId: string, data?: object): Promise<void> {
    const locationId = data as unknown as string;
    if (!locationId) {
      throw Error("Mining requires a location id");
    }

    const target = PlanetFromId(locationId);
    if (!target) {
      throw Error(`no planet from id ${locationId}`);
    }

    switch (target.type) {
      case "Rock": {
        const duration = 3; //ship.cargoCapacity * 10;
        await this.activityService.create(
          activityWorkerId,
          "MINE",
          NowAddSeconds(duration),
          { type: target.type } as MiningData
        );

        return;
      }
      case "Gas":
      case "Ice":
      case "Habitable":
    }
  }
}
