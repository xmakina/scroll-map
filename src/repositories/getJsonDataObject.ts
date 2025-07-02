import { Prisma } from "@prisma/client";

export function getJsonDataObject(data: Prisma.JsonValue) {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data as Prisma.JsonObject;
  }

  throw new Error("Data is not a JsonObject");
}
