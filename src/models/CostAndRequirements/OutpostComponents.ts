import { OutpostComponentType } from "@prisma/client";
import { CostAndRequirementsList } from "./CostAndRequirements";

export const OutpostComponentCostsAndRequirements: CostAndRequirementsList<OutpostComponentType> =
  {
    SMELTER: {
      1: {
        cost: { ORE: 100 },
        requirements: {
          SOLAR_FARM: 1,
        },
      },
    },
    SOLAR_FARM: { 1: { requirements: {}, cost: { SILICON: 100 } } },
    MAKESHIFT_LAUNCH_PAD: { 1: { cost: {}, requirements: {} } },
    COPPER_MINE: {},
    IRON_MINE: {},
    COAL_MINE: {},
    SILICON_MINE: {},
    BASIC_CHIP_FAB: {},
    LAUNCH_PAD: { 1: { cost: { ALLOY: 1000 }, requirements: { SMELTER: 1 } } },
  };
