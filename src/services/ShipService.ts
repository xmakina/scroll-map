import ShipRepository from "@/repositories/ShipRepository";
import { ActivityType } from "@prisma/client";
import ActivityService, { MiningData } from "./ActivityService";
import { CreateShipDetails } from "@/models/CreateShipDetails";
import { ShipData } from "@/models/ShipData";

const CanMine = (data: ShipData, availableOrders: string[]) => {
  const { mining, cargoHold } = data;
  if (mining && cargoHold) {
    return CanSalvage(data, [...availableOrders, "mine"]);
  }

  return CanSalvage(data, availableOrders);
};

const CanSalvage = (data: ShipData, availableOrders: string[]) => {
  const { tractorBeam } = data;
  if (tractorBeam) {
    return [...availableOrders, "salvage"];
  }

  return availableOrders;
};

const ConstructOrders = (data?: ShipData) => {
  const orders = ["scuttle"];
  if (!data) {
    return orders;
  }

  return CanMine(data, orders);
};

export default class ShipService {
  async getOrders(id: string) {
    const ship = await this.repository.getShip(id);
    const orders = ConstructOrders(ship.data as ShipData);

    return orders;
  }

  async getAt(locationId: string) {
    return await this.repository.getAt(locationId);
  }

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

  async createShip(
    playerId: string,
    locationId: string,
    shipDetails: CreateShipDetails
  ) {
    return await this.repository.createShip(playerId, locationId, shipDetails);
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
