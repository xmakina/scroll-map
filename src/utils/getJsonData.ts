import JsonData from "@/models/JsonData/IActivityData";
import { Prisma } from "@prisma/client";

export default function <T extends JsonData>(data: Prisma.JsonValue) {
  if (typeof data !== "object") {
    throw new Error("Data not in expected format");
  }

  return Object.assign({ ...data }) as T;
}
