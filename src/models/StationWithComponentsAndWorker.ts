import { Prisma } from "@prisma/client";

export type StationWithComponentsAndWorker = Prisma.StationGetPayload<{
  include: {
    ActivityWorker: { include: { Activity: true } };
    Components: true;
  };
}>;
