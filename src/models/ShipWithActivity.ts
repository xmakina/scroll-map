import { Prisma } from "@prisma/client";

export type ShipWithActivity = Prisma.ShipGetPayload<{
  include: { Worker: { include: { Activity: true } } };
}>;
