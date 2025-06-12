import { Prisma } from "@prisma/client";

export type CargoHoldWithContainers = Prisma.CargoHoldGetPayload<{
  include: {
    CargoContainers: true;
  };
}>;
