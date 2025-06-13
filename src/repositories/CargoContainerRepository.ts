import { prisma } from "@/prisma";
import { CargoContainer, CargoType } from "@prisma/client";

export default class {
  async removeFrom(id: string, amount: number) {
    return await this.addTo(id, amount * -1);
  }

  async addTo(id: string, amount: number) {
    return await prisma.cargoContainer.update({
      where: { id },
      data: { amount: { increment: amount } },
    });
  }

  async create(cargoHoldId: string, type: CargoType, amount: number) {
    return await prisma.cargoContainer.create({
      data: { cargoHoldId, type, amount },
    });
  }

  async transfer(id: string, cargoHoldId: string) {
    return await prisma.cargoContainer.update({
      where: { id },
      data: { cargoHoldId },
    });
  }

  async delete(id: string) {
    return await prisma.cargoContainer.delete({ where: { id } });
  }

  async get(id: string): Promise<CargoContainer> {
    return await prisma.cargoContainer.findUniqueOrThrow({ where: { id } });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new this();
  }
}
