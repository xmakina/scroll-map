import { OutpostComponentType } from "@prisma/client";
import { CostAndRequirements } from "./CostAndRequirements";
import ShipData from "../JsonData/ShipData";

export type ShipDataWithCost = {
  costAndRequirements: CostAndRequirements<OutpostComponentType>;
  data: ShipData;
};

export const ShipBlueprints: ShipDataWithCost[] = [];
