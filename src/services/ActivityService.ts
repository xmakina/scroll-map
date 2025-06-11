import { ShipData } from "@/models/ShipData";
import ActivityRepository from "@/repositories/ActivityRepository";
import PlanetFromId from "@/utils/PlanetFromId";
import { Worker } from "@prisma/client";

import { ActivityType } from "@prisma/client";
import ShipService from "./ShipService";
import { WorkerWithActivity } from "@/models/WorkerWithActivity";
import StationService from "./StationService";

export type MiningData = {
  type: string;
};

const NowAddSeconds = (seconds: number) =>
  new Date(Date.now() + seconds * 1000);

export default class ActivityService {
  async get(workerId: string) {
    return await this.repository.getWorker(workerId);
  }

  async claim(worker: WorkerWithActivity) {
    const { Activity: activity } = worker;
    if (!activity) {
      throw Error(`No activity assigned to worker ${worker.id}`);
    }

    if (activity.endTime > new Date(Date.now())) {
      console.warn("activity claimed too early", { activityId: activity.id });
      return;
    }

    const parent = await this.get(worker.id);
    switch (activity.type) {
      case "MINE":
        if (parent.Ship) {
          await this.deleteActivity(activity.id);
        } else {
          throw "This type of worker should not mine";
        }
        break;
      case "SCUTTLE":
        if (parent.Ship) {
          // TODO: Refund ship cost, place cargo hold somewhere safe?
          const shipData = parent.Ship.data as ShipData;
          if (shipData.tug?.stationId) {
            await this.stationService.setTugDeployed(
              shipData.tug.stationId,
              false
            );
          }
          await this.shipService.delete(parent.Ship.id);
          return await this.deleteActivity(activity.id);
        }
        throw Error("Only ships can be scuttled");
      case "BUILD":
        if (parent.Station) {
          await this.shipService.createShip(
            parent.Station.playerId,
            parent.Station.id,
            worker.Activity?.data as ShipData
          );
          return await this.deleteActivity(activity.id);
        }
        throw Error("Only stations can build");
      default:
        throw Error(`${activity.type} not implemented yet`);
    }
  }

  async deleteActivity(id: string) {
    return await this.repository.deleteActivity(id);
  }

  async getActivity(id: string) {
    return await this.repository.getActivity(id);
  }

  async begin(worker: Worker, type: ActivityType, data?: unknown) {
    const { id: workerId } = worker;
    switch (type) {
      case "MINE":
        if (!data || typeof data !== "string") {
          throw "Cannot mine without a location";
        }

        return await this.beginMining(workerId, data);
      case "BUILD":
        return await this.beginBuilding(workerId, data as ShipData);
      case "SCUTTLE":
        return await this.beginScuttle(workerId);
      default:
        throw `Not implemented, ${type}`;
    }
  }

  async beginBuilding(workerId: string, shipData: ShipData) {
    return await this.repository.create(
      workerId,
      "BUILD",
      shipData,
      NowAddSeconds(10)
    );
  }

  private async beginMining(workerId: string, locationId: string) {
    const target = PlanetFromId(locationId);
    if (!target) {
      throw Error(`no planet from id ${locationId}`);
    }

    switch (target.type) {
      case "Rock": {
        const duration = 10; //ship.cargoCapacity * 10;
        return await this.repository.create(
          workerId,
          "MINE",
          { type: target.type } as MiningData,
          NowAddSeconds(duration)
        );
      }
      case "Gas":
      case "Ice":
      case "Habitable":
    }
  }

  private async beginScuttle(workerId: string) {
    const duration = 10;
    return await this.repository.create(
      workerId,
      "SCUTTLE",
      {},
      NowAddSeconds(duration)
    );
  }

  constructor(
    private readonly repository: ActivityRepository,
    private readonly shipService: ShipService,
    private readonly stationService: StationService
  ) {}

  static async get(): Promise<ActivityService> {
    return new ActivityService(
      await ActivityRepository.get(),
      await ShipService.get(),
      await StationService.get()
    );
  }
}
