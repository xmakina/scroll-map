"use client";

import { MiningData } from "@/models/MiningData";
import TravelData from "@/models/TravelData";
import getCargoTypeTranslation from "@/utils/getCargoTypeTranslation";
import { Activity } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  activity: Activity;
};

const ActivityLabel = ({ activity }: Props) => {
  const t = useTranslations("ActivityLabel");

  switch (activity.type) {
    case "MINE": {
      const { type } = activity.data as MiningData;
      return (
        <div>{t(activity.type, { type: getCargoTypeTranslation(type) })}</div>
      );
    }
    case "TRAVEL": {
      const { locationId } = activity.data as TravelData;
      return <div>{t(activity.type, { locationId })}</div>;
    }
    default:
      return <div>{t(activity.type)}</div>;
  }
};

export default ActivityLabel;
