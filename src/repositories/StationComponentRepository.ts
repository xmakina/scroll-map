import StationComponentData from "@/models/StationComponentsData";
import { prisma } from "@/prisma";

export default class {
  async upgrade(id: string, data: StationComponentData) {
    await prisma.stationComponent.update({
      where: { id },
      data: { data: { level: data.level } },
    });
  }

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
