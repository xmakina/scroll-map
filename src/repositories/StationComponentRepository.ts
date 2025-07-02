import StationComponentData from "@/models/JsonData/StationComponentData";
import { prisma } from "@/prisma";
import { StationComponentType } from "@prisma/client";
import { getJsonDataObject } from "./getJsonDataObject";

export default class {
  async upgrade(id: string, level: number) {
    const existing = await prisma.stationComponent.findUniqueOrThrow({
      where: { id },
    });

    const existingData = getJsonDataObject(existing);

    await prisma.stationComponent.update({
      where: { id },
      data: { data: { ...existingData, level } },
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
