export type ShipData = {
  engine?: EngineData;
  cargoHold?: { [key: string]: number };
  tractorBeam?: boolean;
  mining?: MiningData;
};

export type EngineData = {
  speed: number;
  range: number;
};

export type MiningData = {
  strength: number;
  rate: number;
};
