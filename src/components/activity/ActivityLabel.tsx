"use client";

import { MiningData } from "@/models/MiningData";
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
      const tr = useTranslations("CargoType");
      const { type } = activity.data as MiningData;
      return <div>{t(activity.type, { type: tr(type) })}</div>;
    }
    case "DELIVER":
    case "BUILD":
    case "BuildShip":
    case "SCUTTLE":
    case "SCAVENGE":
    case "SMELT":
      return <div>{t(activity.type)}</div>;
  }

  return <div>ActivityLabel</div>;
};

export default ActivityLabel;
