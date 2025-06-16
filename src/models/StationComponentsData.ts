import { StationComponentType } from "@prisma/client";
import { UnknownData } from "./UnknownData";

type StationComponentData = {
  type: StationComponentType;
  level: number;
} & UnknownData;

export default StationComponentData;
