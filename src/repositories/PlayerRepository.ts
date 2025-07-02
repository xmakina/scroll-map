import { prisma } from "@/prisma";

export default class PlayerRepository {
  async totalPlayers() {
    return await prisma.player.count({ where: { Ships: { some: {} } } });
  }
  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new PlayerRepository();
  }

  async createPlayer(userId: string) {
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
