import { OutpostComponentType } from "@prisma/client";
import { ShipData } from "../ShipData";
import { CostAndRequirements } from "./CostAndRequirements";

export type ShipDataWithCost = {
  costAndRequirements: CostAndRequirements<OutpostComponentType>;
  data: ShipData;
};

export const ShipBlueprints: ShipDataWithCost[] = [];
