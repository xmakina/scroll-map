"use client";

import Button from "@/components/ui/Button";
import { useShipContext } from "@/context/ShipContext";
import LaunchActivityData from "@/models/JsonData/LaunchActivityData";
import ShipData from "@/models/JsonData/ShipData";
import bindData from "@/utils/bindActivityData";
import getJsonData from "@/utils/getJsonData";
import { ActivityType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  label?: string;
};

const LaunchButton = ({ label }: Props) => {
  const t = useTranslations("ShipDetails");
  const { ship, issueOrder } = useShipContext();
  if (!ship || !issueOrder || ship.ActivityWorker.Activity) {
    return <></>;
  }

  const { berthed = false } = getJsonData<ShipData>(ship.data);
  if (!berthed) {
    return <></>;
  }

  const data = new LaunchActivityData(label ?? t("unnamed location"));
  const handleClick = bindData(issueOrder, ActivityType.LAUNCH, data);

  return <Button onClick={handleClick}>{t("Launch")}</Button>;
};

export default LaunchButton;
