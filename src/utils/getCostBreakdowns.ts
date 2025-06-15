import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { Cost } from "@/models/CostAndRequirements/CostAndRequirements";
import { CargoType } from "@prisma/client";

const getContained = (
  cargoHold: CargoHoldWithContainers,
  cargoType: CargoType
) =>
  cargoHold.CargoContainers.filter((cont) => cont.type === cargoType).reduce(
    (acc, cont) => acc + cont.amount,
    0
  );

export type CostBreakdown = {
  cargoType: CargoType;
  required: number;
  available: number;
};

export default function (
  cost: Cost,
  cargoHold: CargoHoldWithContainers
): CostBreakdown[] {
  console.log({ cost });
  const requiredCargoTypes = Object.keys(cost).map((c) => c as CargoType);

  return requiredCargoTypes.map((ct) => ({
    cargoType: ct,
    required: cost[ct] || 0,
    available: getContained(cargoHold, ct),
  }));
}
