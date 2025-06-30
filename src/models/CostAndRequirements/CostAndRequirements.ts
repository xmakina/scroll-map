import { CargoType } from "@prisma/client";

export type Cost = {
  [key in CargoType]?: number;
};

export type Requirements<T extends string> = {
  [key in T]?: number;
};

export type CostAndRequirements<T extends string> = {
  cost: Cost;
  requirements: Requirements<T>;
};

export type CostAndRequirementsList<T extends string> = {
  [key in T]: {
    [level: number]: CostAndRequirements<T> | undefined;
  };
};
