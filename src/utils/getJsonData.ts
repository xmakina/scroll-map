import { UnknownData } from "@/models/BerthData";
import { Prisma } from "@prisma/client";

export default function <T extends UnknownData>(data: Prisma.JsonValue) {
  if (typeof data !== "object") {
    throw new Error("Data not in expected format");
  }

  return Object.assign({ ...data }) as T;
}
