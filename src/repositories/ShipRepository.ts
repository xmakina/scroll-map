import { prisma } from "@/prisma";

export default class ShipRepository {
  async createShip(playerId: string, xy: { x: number; y: number }) {
    return prisma.ship.create({
      data: { playerId, positionX: xy.x, positionY: xy.y, speed: 10 },
    });
  }
  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new ShipRepository();
  }

  async getShips(playerId: string) {
    return prisma.ship.findMany({ where: { playerId } });
  }
}
