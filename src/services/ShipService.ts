import ShipRepository from "@/repositories/ShipRepository";
import { ActivityType } from "@prisma/client";
import ActivityService from "./ActivityService";
import { ShipData } from "@/models/ShipData";
import StationService from "./StationService";

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
  async get(id: string) {
    return await this.repository.get(id);
  }

  async scuttleShip(id: string) {
    const ship = await this.get(id);
    const data = ship.data as ShipData;
    if (data.tug?.stationId) {
      await this.stationService.setTugDeployed(data.tug.stationId, false);
    }

    return await this.repository.delete(id);
  }

  async getOrders(id: string) {
    const ship = await this.repository.get(id);
    const orders = ConstructOrders(ship.data as ShipData);

    return orders;
  }

  async getAt(locationId: string) {
    return await this.repository.getAt(locationId);
  }

  async startMining(data: {
    shipId: string;
    type: ActivityType;
    planetId: string;
  }) {
    const { shipId, type, planetId } = data;
    const ship = await this.repository.get(shipId);
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
    const ship = await this.repository.get(shipId);
    return await this.activityService.begin(ship, type);
  }

  async createShip(playerId: string, locationId: string, data: ShipData) {
    return await this.repository.createShip(playerId, locationId, data);
  }

  async getShips(playerId: string) {
    return await this.repository.getShips(playerId);
  }

  constructor(
    private readonly repository: ShipRepository,
    private readonly activityService: ActivityService,
    private readonly stationService: StationService
  ) {}

  static async get() {
    return new ShipService(
      await ShipRepository.get(),
      await ActivityService.get(),
      await StationService.get()
    );
  }
}
