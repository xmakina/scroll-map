import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { prisma } from "@/prisma";

export default class {
  async get(id: string): Promise<CargoHoldWithContainers> {
    return await prisma.cargoHold.findUniqueOrThrow({
      where: { id },
      include: { CargoContainers: true },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new this();
  }
}
