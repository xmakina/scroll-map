import { CargoType } from "@prisma/client";
import { UnknownData } from "./UnknownData";

type SmeltData = {
  output: { [key in CargoType]?: number };
  dataType: "SmeltData";
} & UnknownData;

export default SmeltData;
