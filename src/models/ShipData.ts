import { Hull } from "@prisma/client";
import { UnknownData } from "./UnknownData";

export type ShipData = {
  poweredDown?: boolean;
  hullType: Hull;
  engine?: EngineData;
  cargoHold?: boolean;
  tractorBeam?: boolean;
  mining?: MiningData;
  dataType: "ShipData";
} & UnknownData;

type EngineData = {
  speed: number;
  range: number;
};

type MiningData = {
  strength: number;
  rate: number;
};
