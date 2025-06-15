import { StationComponentType } from "@prisma/client";
import CostAndRequirements from "./CostAndRequirements";

export const StationComponentCostAndRequirements: {
  [key in StationComponentType]: {
    [level: number]: CostAndRequirements;
  };
} = {
  SMELTER: {
    2: {
      cost: {
        ALLOY: 1000,
      },
      requirements: { SMELTER: 1 },
    },
    1: {
      cost: {
        ORE: 1000,
        ICE: 500,
      },
      requirements: {},
    },
  },
  VAULT: {
    1: {
      cost: {
        ALLOY: 500,
      },
      requirements: {},
    },
  },
  HANGAR: {
    1: { cost: { ALLOY: 500, GAS: 1000 }, requirements: {} },
  },
};
