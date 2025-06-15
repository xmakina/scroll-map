import CostAndRequirements from "./CostAndRequirements";
import { ShipData } from "../ShipData";

export const ShipCostAndRequirements: {
  [key in string]: {
    costAndRequirements: CostAndRequirements;
    data: ShipData;
    size: number;
  };
} = {
  TUG: {
    costAndRequirements: {
      cost: {},
      requirements: {},
    },
    data: {
      dataType: "ShipData",
      tractorBeam: true,
    },
    size: 0,
  },
  SCOUT: {
    costAndRequirements: {
      cost: {
        ALLOY: 100,
      },
      requirements: {
        HANGAR: 1,
      },
    },
    size: 1,
    data: {
      dataType: "ShipData",
      engine: {
        speed: 10,
        range: 10,
      },
    },
  },
};
