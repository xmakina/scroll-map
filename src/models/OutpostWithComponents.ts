import { Prisma } from "@prisma/client";

export type OutpostWithComponents = Prisma.OutpostGetPayload<{
  include: {
    Player: true;
    Components: true;
    CargoHold: { include: { CargoContainers: true } };
    ActivityWorker: { include: { Activity: true } };
    Ships: {
      include: {
        ActivityWorker: { include: { Activity: true } };
        CargoHold: { include: { CargoContainers: true } };
        Outpost: true;
        Station: true;
      };
    };
  };
}>;
