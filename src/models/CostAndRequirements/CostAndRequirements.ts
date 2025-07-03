import { CargoType } from "@prisma/client";
import ComponentType from "../ComponentType";

export type Cost = {
  [key in CargoType]?: number;
};

export type Requirements<T extends ComponentType> = {
  [key in T]?: number;
};

export type CostAndRequirements<T extends ComponentType> = {
  cost: Cost;
  requirements: Requirements<T>;
};

export type CostAndRequirementsList<T extends ComponentType> = {
  [key in T]: {
    [level: number]: CostAndRequirements<T> | undefined;
  };
};
