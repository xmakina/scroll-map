import { StationComponentType } from "@prisma/client";
import { ShipData } from "../ShipData";
import { CostAndRequirements } from "./CostAndRequirements";

export type ShipDataWithCost = {
  costAndRequirements: CostAndRequirements<StationComponentType>;
  data: ShipData;
};

export const ShipBlueprints: ShipDataWithCost[] = [
  {
    costAndRequirements: {
      cost: {
        ALLOY: 100,
      },
      requirements: { HANGAR: 1 },
    },
    data: {
      hullType: "MINER",
      dataType: "ShipData",
      engine: {
        speed: 1,
        range: 0,
      },
      mining: {
        strength: 1,
        rate: 100,
      },
      cargoHold: true,
    },
  },
  {
    costAndRequirements: {
      cost: {
        ALLOY: 100,
      },
      requirements: {
        HANGAR: 1,
      },
    },
    data: {
      hullType: "SCOUT",
      dataType: "ShipData",
      engine: {
        speed: 10,
        range: 10,
      },
    },
  },
];
