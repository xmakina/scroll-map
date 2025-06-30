import { CargoType } from "@prisma/client";
import { UnknownData } from "./UnknownData";

export type MiningData = {
  type: CargoType;
  dataType: "MiningData";
} & UnknownData;
