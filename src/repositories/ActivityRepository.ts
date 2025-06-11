import { ActivityWorkerWithParent } from "@/models/WorkerWithActivity";
import { prisma } from "@/prisma";
import { ActivityType, Prisma } from "@prisma/client";

export type ActivityWithShip = Prisma.ActivityGetPayload<{
  include: { ActivityWorker: { include: { Ship: true } } };
}>;

export default class ActivityRepository {
  async getWorker(id: string): Promise<ActivityWorkerWithParent> {
    return prisma.activityWorker.findUniqueOrThrow({
      where: { id },
      include: { Ship: true, Station: true, Activity: true },
    });
  }

  async create(
    activityWorkerId: string,
    type: ActivityType,
    endTime: Date,
    data: object = {}
  ) {
    return await prisma.activity.create({
      data: { activityWorkerId, type, data, endTime },
    });
  }
  
  async deleteActivity(id: string) {
    return await prisma.activity.delete({ where: { id } });
  }

  async getActivity(id: string): Promise<ActivityWithShip> {
    return await prisma.activity.findUniqueOrThrow({
      where: { id },
      include: { ActivityWorker: { include: { Ship: true } } },
    });
  }

  private constructor() {}

  static async get() {
    await prisma.$connect();
    return new ActivityRepository();
  }
}
