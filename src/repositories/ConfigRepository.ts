import { prisma } from "@/prisma";
import { ConfigKey } from "@prisma/client";

export default class {
  async get(key: ConfigKey) {
    return await prisma.config.findUniqueOrThrow({ where: { key } });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new this();
  }
}
