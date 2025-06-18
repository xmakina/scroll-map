import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import React from "react";

type Props = {
  cargoHold: CargoHoldWithContainers;
};

const CargoHoldSummary = ({ cargoHold }: Props) => {
  const displayedValues = cargoHold.CargoContainers.filter((c) => c.amount > 0);
  return (
    <div className="flex flex-col items-center">
      <div>Cargo Hold</div>
      <div className="flex flex-row gap-2">
        {displayedValues.map((c) => (
          <div key={c.type} className="border border-white rounded-md p-2">
            {c.type} : {c.amount}
          </div>
        ))}
        {displayedValues.length === 0 && <div className="italic">Empty</div>}
      </div>
    </div>
  );
};

export default CargoHoldSummary;
