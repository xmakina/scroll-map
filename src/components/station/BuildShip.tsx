import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { ShipDataWithCost } from "@/models/CostAndRequirements/Ships";
import getCostBreakdowns, { CostBreakdown } from "@/utils/getCostBreakdowns";
import { useTranslations } from "next-intl";
import React from "react";
import NeededAvailable from "../ui/NeededAvailable";
import Button from "../ui/Button";

export const CanAfford = (cb: CostBreakdown) => cb.available >= cb.required;

type Props = {
  shipData: ShipDataWithCost;
  cargoHold: CargoHoldWithContainers;
  onBuildShip: () => Promise<void> | void;
  isBusy: boolean;
};

const BuildShip = ({ shipData, cargoHold, onBuildShip, isBusy }: Props) => {
  const t = useTranslations("BuildShip");
  const { cost } = shipData.costAndRequirements;

  const costBreakdowns = getCostBreakdowns(cost, cargoHold);
  const canAfford = costBreakdowns.every(CanAfford);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div>{t(shipData.data.shipClassName)}</div>
      <div>
        {costBreakdowns.map((cb) => (
          <NeededAvailable
            key={cb.cargoType}
            needed={cb.required}
            available={cb.available}
          >
            {cb.cargoType}
          </NeededAvailable>
        ))}
      </div>
      {canAfford && !isBusy && (
        <Button onClick={onBuildShip}>
          {t("Build {shipName}", { shipName: t(shipData.data.shipClassName) })}
        </Button>
      )}
    </div>
  );
};

export default BuildShip;
