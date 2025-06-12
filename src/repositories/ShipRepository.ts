import { ShipData } from "@/models/ShipData";
import { prisma } from "@/prisma";
import { ActivityType } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { ShipWithActivityAndCargoHold } from "../models/ShipWithActivity";

export default class ShipRepository {
  async delete(id: string) {
    return prisma.ship.delete({ where: { id } });
  }

  async getAt(locationId: string) {
    return prisma.ship.findMany({
      where: { locationId },
      include: {
        ActivityWorker: { include: { Activity: true } },
        CargoHold: { include: { CargoContainers: true } },
      },
    });
  }

  async startWork(
    shipId: string,
    type: ActivityType,
    data: InputJsonValue,
    endTime: Date
  ) {
    const { activityWorkerId } = await this.get(shipId);

    return prisma.activity.create({
      data: {
        activityWorkerId,
        type,
        data,
        endTime,
      },
    });
  }

  async get(id: string): Promise<ShipWithActivityAndCargoHold> {
    return await prisma.ship.findUniqueOrThrow({
      where: { id },
      include: {
        ActivityWorker: { include: { Activity: true } },
        CargoHold: { include: { CargoContainers: true } },
      },
    });
  }

  async getShips(playerId: string): Promise<ShipWithActivityAndCargoHold[]> {
    console.log("finding ships");
    return await prisma.ship.findMany({
      where: { playerId },
      include: {
        ActivityWorker: { include: { Activity: true } },
        CargoHold: { include: { CargoContainers: true } },
      },
    });
  }

  private async createCargoHold(data: ShipData) {
    if (data.cargoHold) {
      const { id } = await prisma.cargoHold.create({ data: {} });
      return id;
    }

    return;
  }

  async createShip(playerId: string, locationId: string, data: ShipData) {
    const { id: activityWorkerId } = await prisma.activityWorker.create({
      data: {},
    });

    const cargoHoldId = await this.createCargoHold(data);

    return prisma.ship.create({
      data: {
        playerId,
        locationId,
        activityWorkerId,
        cargoHoldId,
        data,
      },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new ShipRepository();
  }
}
