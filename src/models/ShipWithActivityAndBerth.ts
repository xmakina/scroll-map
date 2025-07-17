import { Prisma } from "@prisma/client";

export type ShipWithActivityAndBerth = Prisma.ShipGetPayload<{
  include: {
    ActivityWorker: { include: { Activity: true } };
    CargoHold: { include: { CargoContainers: true } };
    Station: true;
    Outpost: true;
  };
}>;
