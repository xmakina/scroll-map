import ActivityRepository from "@/repositories/ActivityRepository";
import { ActivityWorker } from "@prisma/client";

import { ActivityType } from "@prisma/client";
import ShipService from "./ShipService";
import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import StationService from "./StationService";
import ScuttleActivity from "@/activities/ScuttleActivity";
import { IActivityHandler } from "@/activities/IActivityHandler";
import { NotImplementedActivity } from "@/activities/NotImplementedActivity";
import BuildActivity from "@/activities/BuildActivity";
import MiningActivity from "@/activities/MiningActivity";
import ScavengeActivity from "@/activities/ScavengeActivity";
import CargoHoldService from "./CargoHoldService";
import { UnknownData } from "@/models/UnknownData";
import StationComponentService from "./StationComponentService";
import SmeltActivity from "@/activities/SmeltActivity";
import BuildShipActivity from "@/activities/BuildShipActivity";

export default class ActivityService {
  async getWorker(activityWorkerId: string) {
    return await this.repository.getWorker(activityWorkerId);
  }

  async claim(activityWorker: ActivityWorkerWithActivity) {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw Error(
        `No activity assigned to activityWorker ${activityWorker.id}`
      );
    }

    await this.activities[activity.type].claim(activityWorker);
    await this.repository.delete(activity.id);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async get(id: string) {
    return await this.repository.get(id);
  }

  async create<T extends object>(
    activityWorkerId: string,
    activityType: ActivityType,
    duration: number,
    data?: T & UnknownData
  ) {
    return await this.repository.create(
      activityWorkerId,
      activityType,
      duration,
      data ?? { dataType: "None" }
    );
  }

  async begin<T extends object>(
    activityWorker: ActivityWorker,
    type: ActivityType,
    data?: T & UnknownData
  ) {
    return await this.activities[type].begin(activityWorker.id, data);
  }

  private activities: { [key in ActivityType]: IActivityHandler };

  constructor(
    private readonly repository: ActivityRepository,
    shipService: ShipService,
    stationService: StationService,
    cargoHoldService: CargoHoldService,
    stationComponentService: StationComponentService
  ) {
    this.activities = {
      SCUTTLE: new ScuttleActivity(shipService, stationService, this),
      BUILD: new BuildActivity(stationComponentService, stationService, this),
      BuildShip: new BuildShipActivity(this, stationService, shipService),
      DELIVER: new NotImplementedActivity(),
      MINE: new MiningActivity(cargoHoldService, this),
      SCAVENGE: new ScavengeActivity(stationService, cargoHoldService, this),
      SMELT: new SmeltActivity(cargoHoldService, stationService, this),
    };
  }

  static async get(): Promise<ActivityService> {
    return new ActivityService(
      await ActivityRepository.get(),
      await ShipService.get(),
      await StationService.get(),
      await CargoHoldService.get(),
      await StationComponentService.get()
    );
  }
}
