import { Prisma } from "@prisma/client";

export type ShipWithActivity = Prisma.ShipGetPayload<{
  include: { ActivityWorker: { include: { Activity: true } } };
}>;
