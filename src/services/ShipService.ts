import ShipRepository from "@/repositories/ShipRepository";
import { ActivityType } from "@prisma/client";

export default class ShipService {
  async startWork(
    shipId: string,
    type: ActivityType,
    data: object,
    durationMS: number
  ) {
    return await this.repository.startWork(
      shipId,
      type,
      data,
      new Date(Date.now() + durationMS)
    );
  }

  async createShip(playerId: string, xy: { x: number; y: number }) {
    return await this.repository.createShip(playerId, xy);
  }

  async getShips(playerId: string) {
    return await this.repository.getShips(playerId);
  }

  constructor(private readonly repository: ShipRepository) {}

  static async get() {
    return new ShipService(await ShipRepository.get());
  }
}
