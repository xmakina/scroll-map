import ShipRepository from "@/repositories/ShipRepository";

export default class ShipService {
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
