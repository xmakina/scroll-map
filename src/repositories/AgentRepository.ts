import { prisma } from "@/prisma";

export default class AgentRepository {
  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new AgentRepository();
  }

  async createAgent(userId: string) {
    console.log("creating agent", userId);
    return await prisma.agent.upsert({
      where: {
        id: userId,
      },
      update: {},
      create: {
        userId,
        locationX: 0,
        locationY: 0,
      },
    });
  }

  async findAgents(userId: string) {
    return await prisma.agent.findMany({ where: { userId } });
  }

  async moveAgent(id: string, deltaX: number, deltaY: number) {
    return await prisma.agent.update({
      where: { id },
      data: {
        locationX: { increment: deltaX },
        locationY: { increment: deltaY },
      },
    });
  }

  async getAgent(id: string) {
    return await prisma.agent.findFirstOrThrow({ where: { id } });
  }
}
