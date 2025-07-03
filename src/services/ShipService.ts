import { BerthLocation } from "@/models/JsonData/BerthData";
import ShipData from "@/models/JsonData/ShipData";
import ShipRepository from "@/repositories/ShipRepository";
import NameGenerator from "@/utils/NameGenerator";

export default class ShipService {
  async launch(id: string) {
    return await this.repository.launch(id);
  }

  async berth(id: string, location: BerthLocation) {
    return await this.repository.berth(id, location);
  }

  async updateLocation(id: string, locationId: string) {
    return await this.repository.updateLocation(id, locationId);
  }

  async getActivityWorker(shipId: string) {
    const ship = await this.get(shipId);
    return ship.ActivityWorker;
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async get(id: string) {
    return await this.repository.get(id);
  }

  async getAt(locationId: string) {
    return await this.repository.getAt(locationId);
  }

  async createShip(playerId: string, locationId: string, data: ShipData) {
    const label = NameGenerator.ForShips();
    return await this.repository.createShip(playerId, locationId, data, label);
  }

  async getShips(playerId: string) {
    return await this.repository.getShips(playerId);
  }

  constructor(private readonly repository: ShipRepository) {}

  static async get() {
    return new ShipService(await ShipRepository.get());
  }
}
