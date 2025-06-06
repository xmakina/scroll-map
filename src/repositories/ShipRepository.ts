import { CreateShipDetails } from "@/models/CreateShipDetails";
import { prisma } from "@/prisma";
import { ActivityType, Prisma } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";

export type ShipWithActivity = Prisma.ShipGetPayload<{
  include: { Worker: { include: { Activity: true } } };
}>;

export default class ShipRepository {
  async getAt(locationId: string) {
    return prisma.ship.findMany({ where: { locationId } });
  }

  async setCargo(id: string, type: string) {
    return await prisma.ship.update({ where: { id }, data: { cargo: type } });
  }

  async emptyCargo(id: string) {
    return await prisma.ship.update({ where: { id }, data: { cargo: null } });
  }

  async startWork(
    shipId: string,
    type: ActivityType,
    data: InputJsonValue,
    endTime: Date
  ) {
    const { workerId } = await this.getShip(shipId);

    return prisma.activity.create({
      data: {
        workerId,
        type,
        data,
        endTime,
      },
    });
  }

  async getShip(id: string): Promise<ShipWithActivity> {
    return await prisma.ship.findUniqueOrThrow({
      where: { id },
      include: { Worker: { include: { Activity: true } } },
    });
  }

  async getShips(playerId: string): Promise<ShipWithActivity[]> {
    console.log("finding ships");
    return await prisma.ship.findMany({
      where: { playerId },
      include: { Worker: { include: { Activity: true } } },
    });
  }

  async createShip(
    playerId: string,
    locationId: string,
    details: CreateShipDetails
  ) {
    const { id } = await prisma.worker.create({ data: {} });
    console.log("creating ship repo");
    return prisma.ship.create({
      data: {
        playerId,
        locationId,
        speed: 10,
        workerId: id,
        cargoCapacity: 100,
        ...details,
      },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new ShipRepository();
  }
}
