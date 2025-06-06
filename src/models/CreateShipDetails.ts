import { Ship } from "@prisma/client";

export type CreateShipDetails = Omit<
  Partial<Ship>,
  "id" | "workerId" | "playerId" | "locationId"
>;
