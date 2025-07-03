import { prisma } from "@/prisma";
import { OutpostComponentType } from "@prisma/client";
import getJsonData from "@/utils/getJsonData";
import OutpostComponentData from "@/models/JsonData/OutpostComponentData";

export default class {
  async upgrade(id: string) {
    const existing = await prisma.outpostComponent.findUniqueOrThrow({
      where: { id },
    });

    const data: OutpostComponentData = getJsonData(existing.data);

    await prisma.outpostComponent.update({
      where: { id },
      data: { data: { ...data, level: data.level + 1 } },
    });
  }

  async create(
    outpostId: string,
    type: OutpostComponentType,
    data: OutpostComponentData
  ) {
    await prisma.outpostComponent.create({
      data: { outpostId, type, data: { ...data } },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new this();
  }
}
