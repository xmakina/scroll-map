import JsonData from "@/models/JsonData/IActivityData";
import { ActivityType } from "@prisma/client";

export default function <T extends JsonData>(
  bindFunc: (activityType: ActivityType, data: T) => void | Promise<void>,
  activityType: ActivityType,
  data: T
) {
  return bindFunc.bind(null, activityType, { ...data });
}
