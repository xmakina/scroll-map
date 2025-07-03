import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";
import CargoHoldService from "@/services/CargoHoldService";
import { ActivityType } from "@prisma/client";
import StationService from "@/services/StationService";
import DeliveryData from "@/models/JsonData/DeliveryData";

export default class implements IActivityHandler {
  constructor(
    private readonly stationService: StationService,
    private readonly cargoHoldService: CargoHoldService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }

    const parent = await this.activityService.getWorker(activityWorker.id);
    if (!parent.Ship) {
      throw new Error("Only ships can deliver");
    }

    const ship = parent.Ship;
    if (!ship.cargoHoldId) {
      throw new Error("Only ships with a cargo hold can deliver");
    }

    const station = await this.stationService.maybeGet(ship.locationId);
    if (!station) {
      throw new Error("Ship must be assigned to a station to deliver");
    }

    const shipCargoHold = await this.cargoHoldService.get(ship.cargoHoldId);

    const provide = this.cargoHoldService.provide(
      station.CargoHold.id,
      shipCargoHold.CargoContainers
    );
    const consume = this.cargoHoldService.empty(shipCargoHold.id);

    await Promise.all([provide, consume]);
  }

  async begin(activityWorkerId: string, data: DeliveryData): Promise<void> {
    if (!data) {
      throw new Error("DeliveryData must be supplied");
    }

    await this.activityService.create(
      activityWorkerId,
      ActivityType.DELIVER,
      1,
      data
    );
  }
}
