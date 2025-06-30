import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  cargoHold: CargoHoldWithContainers | null;
  column?: boolean;
};

const CargoHoldSummary = ({ cargoHold, column = false }: Props) => {
  const t = useTranslations("CargoType");
  if (cargoHold === null) {
    return <div className="italic">No cargo capacity</div>;
  }
  const displayedValues = cargoHold.CargoContainers.filter((c) => c.amount > 0);
  return (
    <div
      className={clsx("flex flex-row gap-2 items-center justify-evenly", {
        "flex-col": column,
      })}
    >
      {displayedValues.map((c) => (
        <div
          key={c.type}
          className="flex flex-col border border-white rounded-md p-2 md:flex-row md:gap-1 text-center md:text-left md:flex-nowrap items-center"
        >
          <div>{t(c.type)}</div>
          <div className="hidden md:flex">:</div>
          <div>{c.amount}</div>
        </div>
      ))}
      {displayedValues.length === 0 && <div className="italic">Empty</div>}
    </div>
  );
};

export default CargoHoldSummary;
