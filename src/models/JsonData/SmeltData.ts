import { CargoType } from "@prisma/client";
import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "SmeltData";
  constructor(public readonly output: { [key in CargoType]?: number }) {}
}
