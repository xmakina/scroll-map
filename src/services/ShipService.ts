import ShipRepository from "@/repositories/ShipRepository";
import { ActivityType } from "@prisma/client";
import ActivityService, { MiningData } from "./ActivityService";

export default class ShipService {
  async setCargo(id: string, type: string) {
    return await this.repository.setCargo(id, type);
  }
  async startMining(data: {
    shipId: string;
    type: ActivityType;
    planetId: string;
  }) {
    const { shipId, type, planetId } = data;
    const ship = await this.repository.getShip(shipId);
    return await this.activityService.begin(ship, type, planetId);
  }

  async claimActivity(id: string, activityId: string) {
    const activity = await this.activityService.getActivity(activityId);

    if (activity.endTime > new Date(Date.now())) {
      console.warn("activity claimed too early", { activityId: activityId });
      return;
    }

    switch (activity.type) {
      case "BUILD":
        break;
      case "MINE":
        if (activity.Worker.Ship) {
          await this.setCargo(id, (activity.data as MiningData).type);
          await this.activityService.deleteActivity(activityId);
        } else {
          throw "This type of worker should not mine";
        }
        break;
      case "DELIVER":
        break;
    }
  }

  async startWork(shipId: string, type: ActivityType) {
    const ship = await this.repository.getShip(shipId);
    return await this.activityService.begin(ship, type);
  }

  async createShip(playerId: string, xy: { x: number; y: number }) {
    return await this.repository.createShip(playerId, xy);
  }

  async getShips(playerId: string) {
    return await this.repository.getShips(playerId);
  }

  constructor(
    private readonly repository: ShipRepository,
    private readonly activityService: ActivityService
  ) {}

  static async get() {
    return new ShipService(
      await ShipRepository.get(),
      await ActivityService.get()
    );
  }
}
