import { Prisma } from "@prisma/client";

export type WorkerWithActivity = Prisma.WorkerGetPayload<{
  include: { Activity: true };
}>;

export type WorkerWithParent = Prisma.WorkerGetPayload<{
  include: { Activity: true; Ship: true; Station: true };
}>;
