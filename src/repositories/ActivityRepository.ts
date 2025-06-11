import { WorkerWithParent } from "@/models/WorkerWithActivity";
import { prisma } from "@/prisma";
import { ActivityType, Prisma } from "@prisma/client";

export type ActivityWithShip = Prisma.ActivityGetPayload<{
  include: { Worker: { include: { Ship: true } } };
}>;

export default class ActivityRepository {
  async getWorker(id: string): Promise<WorkerWithParent> {
    return prisma.worker.findUniqueOrThrow({
      where: { id },
      include: { Ship: true, Station: true, Activity: true },
    });
  }

  async create(
    workerId: string,
    type: ActivityType,
    data: object,
    endTime: Date
  ) {
    return await prisma.activity.create({
      data: { workerId, type, data, endTime },
    });
  }
  async deleteActivity(id: string) {
    return await prisma.activity.delete({ where: { id } });
  }

  async getActivity(id: string): Promise<ActivityWithShip> {
    return await prisma.activity.findUniqueOrThrow({
      where: { id },
      include: { Worker: { include: { Ship: true } } },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new ActivityRepository();
  }
}
