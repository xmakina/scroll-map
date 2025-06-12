import { Prisma } from "@prisma/client";

export type ShipWithActivityAndCargoHold = Prisma.ShipGetPayload<{
  include: {
    ActivityWorker: { include: { Activity: true } };
    CargoHold: { include: { CargoContainers: true } };
  };
}>;
