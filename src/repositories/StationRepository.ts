import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsAndWorker";
import { prisma } from "@/prisma";

export default class StationRepository {
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
    return await prisma.station.create({
      data: {
        positionX: x,
        positionY: y,
        playerId,
        workerId,
        hold: {},
      },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new StationRepository();
  }
}
