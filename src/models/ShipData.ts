import { UnknownData } from "./UnknownData";

export type ShipData = {
  shipClassName: string;
  size: number;
  engine?: EngineData;
  cargoHold?: boolean;
  tractorBeam?: boolean;
  mining?: MiningData;
} & UnknownData;

type EngineData = {
  speed: number;
  range: number;
};

type MiningData = {
  strength: number;
  rate: number;
};
