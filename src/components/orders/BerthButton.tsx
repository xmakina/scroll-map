"use client";

import { ActivityType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "../ui/Button";
import { useShipContext } from "@/context/ShipContext";
import ShipData from "@/models/JsonData/ShipData";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import BerthData, { BerthLocation } from "@/models/JsonData/BerthData";
import bindData from "@/utils/bindActivityData";
import getJsonData from "@/utils/getJsonData";

type Props = {
  location: BerthLocation;
};

const checkCanBerth = (
  ship?: ShipWithActivityAndCargoHold,
  locationId?: string
) => {
  if (
    ship === undefined ||
    ship.ActivityWorker.Activity ||
    ship.locationId === locationId
  ) {
    return false;
  }

  const { berthed } = getJsonData<ShipData>(ship.data);
  return !berthed;
};

const BerthButton = ({ location }: Props) => {
  const t = useTranslations("OrderButton");

  const { ship, issueOrder } = useShipContext();
  const locationId = location.outpostId ?? location.stationId;
  if (!locationId) {
    throw new Error("No valid berth provided");
  }

  const canBerth = checkCanBerth(ship, locationId);
  console.log({ canBerth });
  if (!canBerth) {
    return <div></div>;
  }

  const locationType = location.outpostId ? "outpost" : "station";

  const data: BerthData = new BerthData(location);
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
