import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { StationComponentRequirement } from "@/models/StationComponents";
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
  target: StationComponentRequirement,
  cargoHold: CargoHoldWithContainers
): CostBreakdown[] {
  const requiredCargoTypes = Object.keys(target.Cost).map(
    (c) => c as CargoType
  );

  return requiredCargoTypes.map((ct) => ({
    cargoType: ct,
    required: target.Cost[ct] || 0,
    available: getContained(cargoHold, ct),
  }));
}
