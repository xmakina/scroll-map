import { Hull } from "@prisma/client";
import { UnknownData } from "./BerthData";

export default class extends UnknownData {
  dataType = "ShipData";

  berthed?: boolean;
  engine?: EngineData;
  cargoHold?: boolean;
  tractorBeam?: boolean;
  mining?: MiningData;

  constructor(public readonly hullType: Hull) {
    super();
  }
}

type EngineData = {
  speed: number;
  range: number;
};

type MiningData = {
  strength: number;
  rate: number;
};
