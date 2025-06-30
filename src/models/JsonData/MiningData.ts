import { CargoType } from "@prisma/client";
import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "MiningData";

  constructor(public readonly type: CargoType) {}
}
