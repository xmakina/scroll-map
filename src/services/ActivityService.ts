import ActivityRepository from "@/repositories/ActivityRepository";
import PlanetFromId from "@/utils/PlanetFromId";
import { Worker } from "@prisma/client";

import { ActivityType } from "@prisma/client";

export type MiningData = {
  type: string;
};

export default class ActivityService {
  async deleteActivity(id: string) {
    return await this.repository.deleteActivity(id);
  }

  async getActivity(id: string) {
    return await this.repository.getActivity(id);
  }

  async begin(worker: Worker, type: ActivityType, locationId?: string) {
    const { id: workerId } = worker;
    switch (type) {
      case "MINE":
        if (!locationId) {
          throw "Cannot mine without a location";
        }

        return await this.beginMining(workerId, locationId);
      case "SCUTTLE":
        return await this.beginScuttle(workerId);
      default:
        throw `Not implemented, ${type}`;
    }
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
          new Date(Date.now() + duration * 1000)
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
      new Date(Date.now() + duration * 1000)
    );
  }

  constructor(private readonly repository: ActivityRepository) {}

  static async get(): Promise<ActivityService> {
    return new ActivityService(await ActivityRepository.get());
  }
}
