export type ShipData = {
  engine?: EngineData;
  cargoHold?: { [key: string]: number };
  tractorBeam?: boolean;
  mining?: MiningData;
  tug?: TugData;
};

type EngineData = {
  speed: number;
  range: number;
};

type MiningData = {
  strength: number;
  rate: number;
};

type TugData = {
  stationId: string;
};
