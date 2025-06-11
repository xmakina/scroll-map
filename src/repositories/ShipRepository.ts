import { ShipData } from "@/models/ShipData";
import { prisma } from "@/prisma";
import { ActivityType } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { ShipWithActivity } from "../models/ShipWithActivity";

export default class ShipRepository {
  async delete(id: string) {
    return prisma.ship.delete({ where: { id } });
  }

  async getAt(locationId: string) {
    return prisma.ship.findMany({
      where: { locationId },
      include: { Worker: { include: { Activity: true } } },
    });
  }

  async startWork(
    shipId: string,
    type: ActivityType,
    data: InputJsonValue,
    endTime: Date
  ) {
    const { workerId } = await this.get(shipId);

    return prisma.activity.create({
      data: {
        workerId,
        type,
        data,
        endTime,
      },
    });
  }

  async get(id: string): Promise<ShipWithActivity> {
    return await prisma.ship.findUniqueOrThrow({
      where: { id },
      include: {
        Worker: { include: { Activity: true } },
      },
    });
  }

  async getShips(playerId: string): Promise<ShipWithActivity[]> {
    console.log("finding ships");
    return await prisma.ship.findMany({
      where: { playerId },
      include: { Worker: { include: { Activity: true } } },
    });
  }

  async createShip(playerId: string, locationId: string, data: ShipData) {
    const { id: workerId } = await prisma.worker.create({ data: {} });
    const { id: cargoHoldId } = await prisma.cargoHold.create({ data: {} });
    console.log("creating ship repo");
    return prisma.ship.create({
      data: {
        playerId,
        locationId,
        workerId,
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
