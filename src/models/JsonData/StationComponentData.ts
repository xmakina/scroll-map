import { StationComponentType } from "@prisma/client";
import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "StationComponentData";

  constructor(
    public readonly type: StationComponentType,
    public readonly level: number
  ) {}
}
