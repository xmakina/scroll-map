import WaypointSummary from "@/components/map/WaypointSummary";
import BorderedBox from "@/components/ui/BorderedBox";
import Title from "@/components/ui/Title";
import { ShipContextProvider } from "@/context/ShipContext";
import ShipService from "@/services/ShipService";
import WaypointFromId from "@/utils/WaypointFromId";
import { getTranslations } from "next-intl/server";
import React from "react";
import { claimActivity, issueShipOrder } from "../action";
import ActivityDetails from "@/components/activity/ActivityDetails";
import CargoHoldSummary from "@/components/cargoHold/CargoHoldSummary";
import LocationIdentifier from "@/components/LocationIdentifier";
import getJsonData from "@/utils/getJsonData";
import ShipData from "@/models/JsonData/ShipData";
import WaypointService from "@/services/WaypointService";
import BerthLink from "./BerthLink";

type Props = { params: Promise<{ id: string }> };

const shipService = await ShipService.get();

const ShipDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const ship = await shipService.get(id);
  const { berthed } = getJsonData<ShipData>(ship.data);

  const location = WaypointFromId(ship.locationId);
  const locationType = WaypointService.GetType(ship.locationId);
  const handleIssueOrder = issueShipOrder.bind(null, id);
  const handleClaim = claimActivity.bind(null, id);

  const t = await getTranslations("ShipDetails");

  return (
    <ShipContextProvider ship={ship} issueOrder={handleIssueOrder}>
      <div className="flex flex-col gap-4 items-center">
        <Title>{ship.label}</Title>
        <div className="flex flex-row gap-2">
          <LocationIdentifier locationId={ship.locationId} />
          {berthed && `(${t("Berthed", { locationType })})`}
        </div>
        <div className="flex flex-col md:flex-row md:gap-8 gap-4">
          {!berthed && (
            <BorderedBox title={t("System Map")}>
              <WaypointSummary x={location.xPos} y={location.yPos} />
            </BorderedBox>
          )}
          {ship.CargoHold && (
            <BorderedBox title={t("Cargo Hold")}>
              <CargoHoldSummary cargoHold={ship.CargoHold} />
            </BorderedBox>
          )}
        </div>

        {berthed && (
          <div className="flex flex-col items-center">
            <BerthLink
              locationType={locationType}
              locationId={ship.locationId}
            />
          </div>
        )}
        {ship.ActivityWorker.Activity && (
          <BorderedBox title={t("Current Task")}>
            <ActivityDetails
              activity={ship.ActivityWorker.Activity}
              onClaim={handleClaim}
            />
          </BorderedBox>
        )}
      </div>
    </ShipContextProvider>
  );
};

export default ShipDetailsPage;
