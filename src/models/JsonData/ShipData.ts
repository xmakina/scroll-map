import { Hull } from "@prisma/client";
import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "ShipData";

  berthed?: boolean;
  engine?: EngineData;
  cargoHold?: boolean;
  tractorBeam?: boolean;
  mining?: MiningData;

  constructor(public readonly hullType: Hull) {}
}

type EngineData = {
  speed: number;
  range: number;
};

type MiningData = {
  strength: number;
  rate: number;
};
