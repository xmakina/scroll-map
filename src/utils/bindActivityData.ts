import { UnknownData } from "@/models/BerthData";
import { ActivityType } from "@prisma/client";

export default function <T extends UnknownData>(
  bindFunc: (activityType: ActivityType, data: T) => void | Promise<void>,
  activityType: ActivityType,
  data: T
) {
  return bindFunc.bind(null, activityType, { ...data });
}
