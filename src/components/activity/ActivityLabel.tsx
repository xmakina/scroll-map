"use client";

import BerthData from "@/models/JsonData/BerthData";
import TravelData from "@/models/JsonData/TravelData";
import getActivityData from "@/utils/getJsonData";
import { Activity } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import getJsonData from "@/utils/getJsonData";
import MiningData from "@/models/JsonData/MiningData";
import BuildActivityData from "@/models/JsonData/BuildActivityData";
import {
  getCargoTypeTranslation,
  getComponentTypeTranslation,
} from "@/utils/getTranslation";
import ComponentType from "@/models/ComponentType";
import LaunchActivityData from "@/models/JsonData/LaunchActivityData";

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
      const locationType = berthData.location.outpostId ? "outpost" : "station";

      return (
        <div>{t(activity.type, { locationType, label: berthData.label })}</div>
      );
    }
    case "LAUNCH": {
      const launchData: LaunchActivityData = getActivityData(activity.data);

      return <div>{t(activity.type, { label: launchData.label })}</div>;
    }
    case "BUILD": {
      const { type } = getJsonData<BuildActivityData<ComponentType>>(
        activity.data
      );
      return (
        <div>
          {t(activity.type, { type: getComponentTypeTranslation(type) })}
        </div>
      );
    }
    default:
      return <div>{t(activity.type)}</div>;
  }
};

export default ActivityLabel;
