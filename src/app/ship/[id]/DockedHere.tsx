"use client";

import { useShipContext } from "@/context/ShipContext";
import ShipData from "@/models/JsonData/ShipData";
import getJsonData from "@/utils/getJsonData";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  locationId: string;
};

const DockedHere = ({ locationId }: Props) => {
  const t = useTranslations("DockedHere");
  const { ship } = useShipContext();
  const { berthed = false } = getJsonData<ShipData>(ship.data);

  const shipLocation = ship.stationId ?? ship.outpostId;
  if (locationId === shipLocation && berthed) {
    return <div className="italic">{t("Docked")}</div>;
  }

  return <div></div>;
};

export default DockedHere;
