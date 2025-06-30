"use client";

import { ActivityType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "../ui/Button";
import TravelData from "@/models/JsonData/TravelData";
import { useShipContext } from "@/context/ShipContext";
import getJsonData from "@/utils/getJsonData";
import ShipData from "@/models/JsonData/ShipData";

type Props = {
  locationId: string;
};

const Travel = ({ locationId }: Props) => {
  const t = useTranslations("OrderButton");

  const { ship, issueOrder } = useShipContext();
  if (
    ship === undefined ||
    ship.ActivityWorker.Activity ||
    ship.locationId === locationId ||
    getJsonData<ShipData>(ship.data).berthed
  ) {
    return <div></div>;
  }

  const data: TravelData = { locationId, dataType: "TravelData" };
  const handleClick = issueOrder.bind(null, ActivityType.TRAVEL, data);
  return (
    <div>
      <Button onClick={handleClick}>{t(ActivityType.TRAVEL)}</Button>
    </div>
  );
};

export default Travel;
