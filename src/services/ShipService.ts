import ShipRepository from "@/repositories/ShipRepository";
import { ShipData } from "@/models/ShipData";
import ConstructShipOrders from "./ConstructShipOrders";
import generateUniqueName from "@/utils/generateUniqueName";
import { adjectives, animals } from "unique-names-generator";

export default class ShipService {
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

  async getOrders(id: string) {
    const ship = await this.repository.get(id);
    const orders = ConstructShipOrders(ship);

    return orders;
  }

  async getAt(locationId: string) {
    return await this.repository.getAt(locationId);
  }

  async createShip(playerId: string, locationId: string, data: ShipData) {
    const label = generateUniqueName(adjectives, animals);
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
