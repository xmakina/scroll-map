import ShipRepository from "@/repositories/ShipRepository";
import { ActivityType } from "@prisma/client";
import { ShipData } from "@/models/ShipData";

const CanMine = (data: ShipData, availableOrders: ActivityType[]) => {
  const { mining, cargoHold } = data;
  if (mining && cargoHold) {
    return CanScavenge(data, [...availableOrders, ActivityType.MINE]);
  }

  return CanScavenge(data, availableOrders);
};

const CanScavenge = (data: ShipData, availableOrders: ActivityType[]) => {
  const { tractorBeam } = data;
  if (tractorBeam) {
    return [...availableOrders, ActivityType.SCAVENGE];
  }

  return availableOrders;
};

const ConstructOrders = (data?: ShipData) => {
  const orders: ActivityType[] = ["SCUTTLE"];
  if (!data) {
    return orders;
  }

  return CanMine(data, orders);
};

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
    const orders = ConstructOrders(ship.data as ShipData);

    return orders;
  }

  async getAt(locationId: string) {
    return await this.repository.getAt(locationId);
  }

  async createShip(playerId: string, locationId: string, data: ShipData) {
    return await this.repository.createShip(playerId, locationId, data);
  }

  async getShips(playerId: string) {
    return await this.repository.getShips(playerId);
  }

  constructor(private readonly repository: ShipRepository) {}

  static async get() {
    return new ShipService(await ShipRepository.get());
  }
}
