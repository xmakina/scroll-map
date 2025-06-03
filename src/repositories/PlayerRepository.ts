import { prisma } from "@/prisma";

export default class PlayerRepository {
  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new PlayerRepository();
  }

  async createAgent(userId: string) {
    console.log("creating agent", userId);
    return await prisma.player.upsert({
      where: {
        id: userId,
      },
      update: {},
      create: {
        userId,
      },
    });
  }

  async getPlayer(userId: string) {
    return await prisma.player.findFirstOrThrow({ where: { userId } });
  }
}
