"use client";

import { ActivityType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "../ui/Button";
import TravelData from "@/models/TravelData";
import { useShipContext } from "@/context/ShipContext";

type Props = {
  locationId: string;
};

const Travel = ({ locationId }: Props) => {
  const t = useTranslations("OrderButton");

  const { ship, issueOrder } = useShipContext();
  if (ship === undefined) {
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
