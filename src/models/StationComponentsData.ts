import { StationComponentType } from "@prisma/client";
import { UnknownData } from "./UnknownData";

type StationComponentData = {
  type: StationComponentType;
  level: number;
  dataType: "StationComponentData";
} & UnknownData;

export default StationComponentData;
