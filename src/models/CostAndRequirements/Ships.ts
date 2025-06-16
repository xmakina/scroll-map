import CostAndRequirements from "./CostAndRequirements";
import { ShipData } from "../ShipData";

export type ShipDataWithCost = {
  costAndRequirements: CostAndRequirements;
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
      shipClassName: "Miner",
      size: 1,
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
      shipClassName: "Scout",
      size: 1,
      dataType: "ShipData",
      engine: {
        speed: 10,
        range: 10,
      },
    },
  },
];
