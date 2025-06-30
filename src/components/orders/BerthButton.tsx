"use client";

import { ActivityType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "../ui/Button";
import { useShipContext } from "@/context/ShipContext";
import ShipData from "@/models/ShipData";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import BerthData from "@/models/BerthData";
import WaypointService from "@/services/WaypointService";
import bindData from "@/utils/bindActivityData";
import getJsonData from "@/utils/getJsonData";

type Props = {
  locationId: string;
};

const checkCanBerth = (
  locationId: string,
  ship?: ShipWithActivityAndCargoHold
) => {
  if (
    ship === undefined ||
    ship.ActivityWorker.Activity ||
    ship.locationId !== locationId
  ) {
    return false;
  }

  const { berthed } = getJsonData<ShipData>(ship.data);
  return !berthed;
};

const BerthButton = ({ locationId }: Props) => {
  const t = useTranslations("OrderButton");

  const { ship, issueOrder } = useShipContext();
  const canBerth = checkCanBerth(locationId, ship);

  if (!canBerth) {
    return <div></div>;
  }

  const locationType = WaypointService.GetType(locationId);

  const data: BerthData = new BerthData(locationId);
  const handleClick = bindData(issueOrder, ActivityType.BERTH, data);
  return (
    <div>
      <Button onClick={handleClick}>
        {t(ActivityType.BERTH, { locationType })}
      </Button>
    </div>
  );
};

export default BerthButton;
