import {
  ActivityWorkerWithActivity,
  ActivityWorkerWithParent,
} from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { ActivityType, CargoType } from "@prisma/client";
import ActivityService from "@/services/ActivityService";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import CargoHoldService from "@/services/CargoHoldService";
import { findLowestCargo } from "../utils/findLowestCargo";

export const basicResources = [CargoType.GAS, CargoType.ICE, CargoType.ORE];

export default class implements IActivityHandler {
  constructor(
    private readonly shipService: ShipService,
    private readonly stationService: StationService,
    private readonly activityService: ActivityService,
    private readonly cargoHoldService: CargoHoldService
  ) {}

  private async findLowest(activityWorker: ActivityWorkerWithActivity) {
    const parent = await this.activityService.getWorker(activityWorker.id);
    const station = await this.findStation(parent);
    if (station) {
      const cargoHold = await this.cargoHoldService.get(station.cargoHoldId);
      return findLowestCargo(cargoHold, basicResources);
    }

    const { Ship: ship } = parent;
    if (ship) {
      const cargoHold = await this.cargoHoldService.get(ship.cargoHoldId);
      return findLowestCargo(cargoHold, basicResources);
    }

    throw Error("Scavenge can only be done from a ship or station");
  }

  async findStation(
    activityWorker: ActivityWorkerWithParent
  ): Promise<StationWithComponentsAndWorker | null> {
    if (activityWorker.Ship) {
      return await this.stationService.maybeGet(activityWorker.Ship.locationId);
    }

    if (activityWorker.Station) {
      return await this.stationService.get(activityWorker.Station.id);
    }

    return null;
  }

  async findCargoHoldId(activityWorker: ActivityWorkerWithParent) {
    const station = await this.findStation(activityWorker);
    if (station === null) {
      return activityWorker.Ship?.cargoHoldId;
    }

    return station.cargoHoldId;
  }

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }

    const targetCargoType = await this.findLowest(activityWorker);
    const parent = await this.activityService.getWorker(activityWorker.id);

    const cargoHoldId = await this.findCargoHoldId(parent);
    if (!cargoHoldId) {
      throw Error("No cargo hold found while claiming scavenge");
    }

    await this.cargoHoldService.addCargo(cargoHoldId, targetCargoType, 500);
    await this.activityService.delete(activity.id);
  }

  async begin(activityWorkerId: string, data?: object): Promise<void> {
    await this.activityService.create(
      activityWorkerId,
      ActivityType.SCAVENGE,
      NowAddSeconds(3),
      data
    );
  }
}
