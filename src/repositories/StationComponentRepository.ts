import { StationComponentData } from "@/models/StationComponents";
import { prisma } from "@/prisma";

export default class {
  async create(stationId: string, data: StationComponentData) {
    await prisma.stationComponent.create({
      data: { stationId, type: data.type, data: { level: data.level } },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new this();
  }
}
