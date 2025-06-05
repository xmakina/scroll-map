import ActivityRepository from "@/repositories/ActivityRepository";
import { ShipWithActivity } from "@/repositories/ShipRepository";
import { planetFromId } from "@/utils/planetFromId";
import { ActivityType, Ship } from "@prisma/client";

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

  private async beginMining(ship: Ship, locationId: string) {
    const target = planetFromId(locationId);
    if (!target) {
      throw Error(`no planet from id ${locationId}`);
    }

    switch (target.type) {
      case "Rock": {
        const duration = ship.cargoCapacity * 10;
        return await this.repository.create(
          ship.workerId,
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

  async begin(ship: ShipWithActivity, type: ActivityType, locationId?: string) {
    switch (type) {
      case "BUILD":
        throw "Not implemented";
      case "MINE":
        if (!locationId) {
          throw "Cannot mine without a location";
        }

        return await this.beginMining(ship, locationId);
      case "DELIVER":
        throw "Not implemented";
    }
  }

  constructor(private readonly repository: ActivityRepository) {}

  static async get(): Promise<ActivityService> {
    return new ActivityService(await ActivityRepository.get());
  }
}
