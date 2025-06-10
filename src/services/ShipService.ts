import ShipRepository from "@/repositories/ShipRepository";
import { ActivityType } from "@prisma/client";
import ActivityService from "./ActivityService";
import { ShipData } from "@/models/ShipData";
import StationService from "./StationService";

const CanMine = (data: ShipData, availableOrders: ActivityType[]) => {
  const { mining, cargoHold } = data;
  if (mining && cargoHold) {
    return CanSalvage(data, [...availableOrders, ActivityType.MINE]);
  }

  return CanSalvage(data, availableOrders);
};

const CanSalvage = (data: ShipData, availableOrders: ActivityType[]) => {
  const { tractorBeam } = data;
  if (tractorBeam) {
    return [...availableOrders, ActivityType.SALVAGE];
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
  async get(id: string) {
    return await this.repository.get(id);
  }

  async scuttleShip(id: string) {
    const ship = await this.get(id);
    this.activityService.begin(ship.Worker, ActivityType.SCUTTLE);
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
    id: string;
    type: ActivityType;
    planetId: string;
  }) {
    const { id, type, planetId } = data;
    const ship = await this.get(id);
    return await this.activityService.begin(ship.Worker, type, planetId);
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
      case "SCUTTLE":
        if (activity.Worker.Ship) {
          // TODO: Refund ship cost, place cargo hold somewhere safe?
          await this.repository.delete(activity.Worker.Ship.id);
          await this.activityService.deleteActivity(activityId);
        }
        break;
      case "DELIVER":
        break;
    }
  }

  async startWork(shipId: string, type: ActivityType) {
    const ship = await this.get(shipId);
    return await this.activityService.begin(ship.Worker, type);
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
