import React from "react";
import BorderedBox from "../ui/BorderedBox";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import { useTranslations } from "next-intl";
import { NavigationLink } from "../ui/Navigation";
import CargoHoldSummary from "../cargoHold/CargoHoldSummary";
import getJsonData from "@/utils/getJsonData";
import ShipData from "@/models/JsonData/ShipData";
import WaypointService from "@/services/WaypointService";
import LocationIdentifier from "../LocationIdentifier";

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
  const { berthed }: ShipData = getJsonData(ship.data);
  const locationType = WaypointService.GetType(ship.locationId);

  return (
    <BorderedBox title={ship.label}>
      <div className="flex flex-col items-center">
        {location && (
          <div className="flex flex-row gap-2">
            <LocationIdentifier locationId={ship.locationId} />
            {berthed && `(${t("Berthed", { locationType })})`}
          </div>
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
