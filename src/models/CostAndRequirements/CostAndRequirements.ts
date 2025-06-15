import { CargoType, StationComponentType } from "@prisma/client";

export type Cost = { [key in CargoType]?: number };
export type Requirements = { [key in StationComponentType]?: number };

type CostAndRequirements = {
  cost: Cost;
  requirements: Requirements;
};

export default CostAndRequirements;
