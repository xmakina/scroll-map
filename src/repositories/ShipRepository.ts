import { prisma } from "@/prisma";
import { ActivityType } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { ShipWithActivityAndCargoHold } from "../models/ShipWithActivity";
import getActivityData from "@/utils/getJsonData";
import ShipData from "@/models/JsonData/ShipData";

export default class ShipRepository {
  async updateBerthed(id: string, berthed: boolean) {
    const ship = await prisma.ship.findFirstOrThrow({ where: { id } });
    const shipData: ShipData = getActivityData(ship.data);

    return await prisma.ship.update({
      where: { id },
      data: { data: { ...shipData, berthed } },
    });
  }

  async updateLocation(id: string, locationId: string) {
    return prisma.ship.update({ where: { id }, data: { locationId } });
  }

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

  async createShip(
    playerId: string,
    locationId: string,
    shipData: ShipData,
    label: string
  ) {
    const { id: activityWorkerId } = await prisma.activityWorker.create({
      data: {},
    });

    const cargoHoldId = await this.createCargoHold(shipData);
    return prisma.ship.create({
      data: {
        playerId,
        locationId,
        activityWorkerId,
        cargoHoldId,
        data: { ...shipData },
        label,
      },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new ShipRepository();
  }
}
