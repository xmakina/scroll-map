import { CargoType } from "@prisma/client";
import { UnknownData } from "./UnknownData";

type SmeltData = {
  output: { [key in CargoType]?: number };
} & UnknownData;

export default SmeltData;
