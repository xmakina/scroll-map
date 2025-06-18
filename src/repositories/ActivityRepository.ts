import { UnknownData } from "@/models/UnknownData";
import { ActivityWorkerWithParent } from "@/models/WorkerWithActivity";
import { prisma } from "@/prisma";
import { NowAddSeconds } from "@/utils/NowAddSeconds";
import { ActivityType, ConfigKey, Prisma } from "@prisma/client";

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

  async create<T extends object>(
    activityWorkerId: string,
    type: ActivityType,
    duration: number,
    data: T & UnknownData
  ) {
    const fullDuration =
      duration *
      parseInt(
        (
          await prisma.config.findUniqueOrThrow({
            where: { key: ConfigKey.DurationMultiplier },
          })
        ).value
      );
    const endTime = NowAddSeconds(fullDuration);
    return await prisma.activity.create({
      data: { activityWorkerId, type, data, endTime },
    });
  }

  async delete(id: string) {
    return await prisma.activity.delete({ where: { id } });
  }

  async get(id: string): Promise<ActivityWithShip> {
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
