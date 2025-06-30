"use client";

import BerthData from "@/models/JsonData/BerthData";
import TravelData from "@/models/JsonData/TravelData";
import WaypointService from "@/services/WaypointService";
import getActivityData from "@/utils/getJsonData";
import getCargoTypeTranslation from "@/utils/getCargoTypeTranslation";
import { Activity } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import getJsonData from "@/utils/getJsonData";
import MiningData from "@/models/JsonData/MiningData";

type Props = {
  activity: Activity;
};

const ActivityLabel = ({ activity }: Props) => {
  const t = useTranslations("ActivityLabel");

  switch (activity.type) {
    case "MINE": {
      const { type } = getJsonData<MiningData>(activity.data);
      return (
        <div>{t(activity.type, { type: getCargoTypeTranslation(type) })}</div>
      );
    }
    case "TRAVEL": {
      const { locationId } = getJsonData<TravelData>(activity.data);
      return <div>{t(activity.type, { locationId })}</div>;
    }
    case "BERTH": {
      const berthData: BerthData = getActivityData(activity.data);
      const locationId = berthData.locationId;
      const locationType = WaypointService.GetType(locationId);

      return <div>{t(activity.type, { locationType, locationId })}</div>;
    }
    default:
      return <div>{t(activity.type)}</div>;
  }
};

export default ActivityLabel;
