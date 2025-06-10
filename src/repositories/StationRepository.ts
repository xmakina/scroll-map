import { StationData } from "@/models/StationData";
import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsAndWorker";
import { prisma } from "@/prisma";

export default class StationRepository {
  async updateStation(id: string, data: Partial<StationData>) {
    const station = await this.getStation(id);
    const updatedData = { ...(station.data as object), ...data };
    await prisma.station.update({ where: { id }, data: { data: updatedData } });
  }

  async getStation(id: string) {
    return prisma.station.findUniqueOrThrow({
      where: { id },
      include: {
        Worker: { include: { Activity: true } },
        Components: true,
      },
    });
  }

  async getStations(
    playerId: string
  ): Promise<StationWithComponentsAndWorker[]> {
    return await prisma.station.findMany({
      where: { playerId },
      include: {
        Worker: { include: { Activity: true } },
        Components: true,
      },
    });
  }

  async createStation(xy: { x: number; y: number }, playerId: string) {
    const { x, y } = xy;
    const { id: workerId } = await prisma.worker.create({ data: {} });
    const { id: cargoHoldId } = await prisma.cargoHold.create({ data: {} });
    return await prisma.station.create({
      data: {
        positionX: x,
        positionY: y,
        playerId,
        workerId,
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
