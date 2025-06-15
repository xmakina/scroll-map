import { StationData } from "@/models/StationData";
import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import { prisma } from "@/prisma";

export default class StationRepository {
  async updateStation(id: string, data: Partial<StationData>) {
    const station = await this.get(id);
    const updatedData = { ...(station.data as object), ...data };
    await prisma.station.update({ where: { id }, data: { data: updatedData } });
  }

  async get(id: string) {
    return prisma.station.findUniqueOrThrow({
      where: { id },
      include: {
        ActivityWorker: { include: { Activity: true } },
        Components: true,
        CargoHold: { include: { CargoContainers: true } },
      },
    });
  }

  async maybeGet(id: string) {
    return prisma.station.findUnique({
      where: { id },
      include: {
        ActivityWorker: { include: { Activity: true } },
        Components: true,
        CargoHold: { include: { CargoContainers: true } },
      },
    });
  }

  async getStations(
    playerId: string
  ): Promise<StationWithComponentsAndWorker[]> {
    return await prisma.station.findMany({
      where: { playerId },
      include: {
        ActivityWorker: { include: { Activity: true } },
        Components: true,
        CargoHold: { include: { CargoContainers: true } },
      },
    });
  }

  async createStation(xy: { x: number; y: number }, playerId: string) {
    const { x, y } = xy;
    const { id: activityWorkerId } = await prisma.activityWorker.create({
      data: {},
    });
    const { id: cargoHoldId } = await prisma.cargoHold.create({ data: {} });
    return await prisma.station.create({
      data: {
        positionX: x,
        positionY: y,
        playerId,
        activityWorkerId,
        cargoHoldId,
        data: {},
      },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new StationRepository();
  }
}
