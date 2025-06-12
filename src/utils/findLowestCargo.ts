import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { CargoType } from "@prisma/client";

export const findLowestCargo = (
  cargoHold: CargoHoldWithContainers,
  cargoTypes: CargoType[]
) => {
  const matchedContainers = cargoHold.CargoContainers.filter(
    (c) => cargoTypes.indexOf(c.type) != -1
  );

  const missedTypes = cargoTypes.filter(
    (c) => !matchedContainers.some((m) => m.type === c)
  );

  if (missedTypes.length > 0) {
    return missedTypes[0];
  }

  const lowest = matchedContainers.reduce((lowest, container) =>
    lowest.amount < container.amount ? lowest : container
  );

  return lowest.type;
};
