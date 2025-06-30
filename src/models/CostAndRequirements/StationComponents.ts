import { StationComponentType } from "@prisma/client";
import { CostAndRequirementsList } from "./CostAndRequirements";

export const StationComponentCostsAndRequirements: CostAndRequirementsList<StationComponentType> =
  {
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
    HANGAR: {
      1: { cost: { ALLOY: 500, GAS: 1000 }, requirements: {} },
    },
    COMMUNICATOR: {
      1: { cost: { ALLOY: 2000, ICE: 2000, GAS: 6000 }, requirements: {} },
      2: {
        cost: { ALLOY: 4000, ICE: 4000, GAS: 12000 },
        requirements: { COMMUNICATOR: 1, HANGAR: 2 },
      },
      3: {
        cost: { ALLOY: 8000, ICE: 8000, GAS: 24000 },
        requirements: { COMMUNICATOR: 2 },
      },
    },
    SOLAR_FARM: {},
  };
