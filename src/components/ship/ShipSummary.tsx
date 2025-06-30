import React from "react";
import BorderedBox from "../ui/BorderedBox";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import LabeledText from "../ui/LabeledText";
import { useTranslations } from "next-intl";
import { NavigationLink } from "../ui/Navigation";
import CargoHoldSummary from "../cargoHold/CargoHoldSummary";

type Props = {
  ship: ShipWithActivityAndCargoHold;
  control?: boolean;
  cargoHold?: boolean;
  location?: boolean;
};

const ShipSummary = ({
  ship,
  control = false,
  cargoHold = false,
  location = false,
}: Props) => {
  const t = useTranslations("ShipSummary");

  return (
    <BorderedBox title={ship.label}>
      <div className="flex flex-col items-center">
        {location && (
          <LabeledText label={t("Location")}>{ship.locationId}</LabeledText>
        )}
        {cargoHold && <CargoHoldSummary cargoHold={ship.CargoHold} />}
        {control && (
          <NavigationLink href={`/ship/${ship.id}`}>
            Take Control
          </NavigationLink>
        )}
      </div>
    </BorderedBox>
  );
};

export default ShipSummary;
