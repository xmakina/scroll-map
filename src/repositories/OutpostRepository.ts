import { OutpostWithComponents } from "@/models/OutpostWithComponents";
import { prisma } from "@/prisma";

export default class {
  async create({
    planetId,
    playerId,
    label,
  }: {
    playerId: string;
    planetId: string;
    label: string;
  }) {
    const { id: activityWorkerId } = await prisma.activityWorker.create({
      data: {},
    });
    const { id: cargoHoldId } = await prisma.cargoHold.create({ data: {} });
    return await prisma.outpost.create({
      data: {
        activityWorkerId,
        cargoHoldId,
        playerId,
        planetId,
        label,
      },
    });
  }
  async getAll(planetId: string): Promise<OutpostWithComponents[]> {
    return await prisma.outpost.findMany({
      where: { planetId },
      include: {
        Player: true,
        Components: true,
        CargoHold: { include: { CargoContainers: true } },
        ActivityWorker: { include: { Activity: true } },
      },
    });
  }

  async get(id: string): Promise<OutpostWithComponents> {
    return await prisma.outpost.findUniqueOrThrow({
      where: { id },
      include: {
        Player: true,
        Components: true,
        CargoHold: { include: { CargoContainers: true } },
        ActivityWorker: { include: { Activity: true } },
      },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new this();
  }
}
