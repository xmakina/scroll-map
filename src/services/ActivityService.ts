import ActivityRepository from "@/repositories/ActivityRepository";
import { ActivityWorker } from "@prisma/client";

import { ActivityType } from "@prisma/client";
import ShipService from "./ShipService";
import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import StationService from "./StationService";
import ScuttleActivity from "@/activities/ScuttleActivity";
import { IActivityHandler } from "@/activities/IActivityHandler";
import BuildActivity from "@/activities/BuildActivity";
import MiningActivity from "@/activities/MiningActivity";
import ScavengeActivity from "@/activities/ScavengeActivity";
import CargoHoldService from "./CargoHoldService";
import StationComponentService from "./StationComponentService";
import SmeltActivity from "@/activities/SmeltActivity";
import BuildShipActivity from "@/activities/BuildShipActivity";
import DeliverCargoActivity from "@/activities/DeliverCargoActivity";
import EstablishOutpostActivity from "@/activities/EstablishOutpostActivity";
import TravelActivity from "@/activities/TravelActivity";
import BerthActivity from "@/activities/BerthActivity";
import IActivityData from "@/models/JsonData/IActivityData";

export default class ActivityService {
  async getShipFromActivityWorker(activityWorker: ActivityWorkerWithActivity) {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }

    const parent = await this.getWorker(activityWorker.id);
    if (!parent.Ship) {
      throw new Error(`Worker ${activityWorker.id} is not owned by a ship`);
    }

    const shipId = parent.Ship.id;
    return shipId;
  }

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

  async create(
    activityWorkerId: string,
    activityType: ActivityType,
    duration: number,
    data?: IActivityData
  ) {
    return await this.repository.create(
      activityWorkerId,
      activityType,
      duration,
      data
    );
  }

  async begin(
    activityWorker: ActivityWorker,
    type: ActivityType,
    data?: IActivityData
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
      DELIVER: new DeliverCargoActivity(stationService, cargoHoldService, this),
      MINE: new MiningActivity(cargoHoldService, this),
      SCAVENGE: new ScavengeActivity(stationService, cargoHoldService, this),
      SMELT: new SmeltActivity(cargoHoldService, stationService, this),
      ESTABLISH_OUTPOST: new EstablishOutpostActivity(this),
      TRAVEL: new TravelActivity(shipService, this),
      BERTH: new BerthActivity(shipService, this),
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
