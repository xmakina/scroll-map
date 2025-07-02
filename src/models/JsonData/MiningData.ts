import { CargoType } from "@prisma/client";
import JsonData from "./IActivityData";

export default class implements JsonData {
  public readonly dataType = "MiningData";

  constructor(public readonly type: CargoType) {}
}
