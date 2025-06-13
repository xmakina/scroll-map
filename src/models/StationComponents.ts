import { CargoType, StationComponentType } from "@prisma/client";

export type StationComponentRequirement = {
  Cost: { [key in CargoType]?: number };
  Prerequisites: { [key in StationComponentType]?: number };
};

export type StationComponentData = {
  level: number;
};
