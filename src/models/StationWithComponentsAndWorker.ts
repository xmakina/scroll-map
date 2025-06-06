import { Prisma } from "@prisma/client";

export type StationWithComponentsAndWorker = Prisma.StationGetPayload<{
  include: {
    Worker: { include: { Activity: true } };
    Components: true;
  };
}>;
