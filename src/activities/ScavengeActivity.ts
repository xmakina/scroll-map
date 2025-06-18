import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { ActivityType, CargoType } from "@prisma/client";
import ActivityService from "@/services/ActivityService";
import StationService from "@/services/StationService";
import CargoHoldService from "@/services/CargoHoldService";
import { findLowestCargo } from "../utils/findLowestCargo";
import { UnknownData } from "@/models/UnknownData";
import findStation from "@/utils/findStation";
import findCargoHoldId from "@/utils/findCargoHoldId";

export const basicResources = [CargoType.GAS, CargoType.ICE, CargoType.ORE];

export default class implements IActivityHandler {
  constructor(
    private readonly stationService: StationService,
    private readonly cargoHoldService: CargoHoldService,
    private readonly activityService: ActivityService
  ) {}

  private async findLowest(activityWorker: ActivityWorkerWithActivity) {
    const parent = await this.activityService.getWorker(activityWorker.id);
    const station = await findStation(parent, this.stationService);
    if (station) {
      const cargoHold = await this.cargoHoldService.get(station.cargoHoldId);
      return findLowestCargo(cargoHold, basicResources);
    }

    const { Ship: ship } = parent;
    if (ship && ship.cargoHoldId) {
      const cargoHold = await this.cargoHoldService.get(ship.cargoHoldId);
      return findLowestCargo(cargoHold, basicResources);
    }

    throw Error(
      "Scavenge can only be done from a ship with a cargo hold or a station"
    );
  }

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }

    const targetCargoType = await this.findLowest(activityWorker);
    const parent = await this.activityService.getWorker(activityWorker.id);

    const cargoHoldId = findCargoHoldId(parent);

    await this.cargoHoldService.addCargo(cargoHoldId, targetCargoType, 500);
  }

  async begin<T extends object>(
    activityWorkerId: string,
    data?: T & UnknownData
  ): Promise<void> {
    await this.activityService.create(
      activityWorkerId,
      ActivityType.SCAVENGE,
      NowAddSeconds(1),
      data
    );
  }
}
