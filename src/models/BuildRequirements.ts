import { StationComponentType } from "@prisma/client";
import { StationComponentRequirement } from "./StationComponents";

export const BuildRequirements: {
  [key in StationComponentType]: {
    [level: number]: StationComponentRequirement;
  };
} = {
  SMELTER: {
    2: {
      Cost: {
        ALLOY: 1000,
      },
      Prerequisites: { SMELTER: 1 },
    },
    1: {
      Cost: {
        ORE: 1000,
        ICE: 500,
      },
      Prerequisites: {},
    },
  },
  VAULT: {
    1: {
      Cost: {
        ALLOY: 500,
      },
      Prerequisites: {},
    },
  },
  HANGAR: {
    1: { Cost: { ALLOY: 500, GAS: 1000 }, Prerequisites: {} },
  },
};
