import StationComponentData from "@/models/JsonData/StationComponentData";
import { prisma } from "@/prisma";
import { StationComponentType } from "@prisma/client";
import getJsonData from "@/utils/getJsonData";

export default class {
  async upgrade(id: string) {
    const existing = await prisma.stationComponent.findUniqueOrThrow({
      where: { id },
    });

    const data: StationComponentData = getJsonData(existing.data);

    await prisma.stationComponent.update({
      where: { id },
      data: { data: { ...data, level: data.level + 1 } },
    });
  }

  async create(
    stationId: string,
    type: StationComponentType,
    data: StationComponentData
  ) {
    await prisma.stationComponent.create({
      data: { stationId, type, data: { ...data } },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new this();
  }
}
