import { Prisma } from "@prisma/client";

export type ActivityWorkerWithActivity = Prisma.ActivityWorkerGetPayload<{
  include: { Activity: true };
}>;

export type ActivityWorkerWithParent = Prisma.ActivityWorkerGetPayload<{
  include: { Activity: true; Ship: true; Station: true };
}>;
