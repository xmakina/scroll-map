import { Outpost, Station } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  station?: Station;
  outpost?: Outpost;
};

const BerthDetails = ({ station, outpost }: Props) => {
  const t = useTranslations("Berth Details");
  if (!station && !outpost) {
    return <div className="italic">{t("None")}</div>;
  }

  const generic = { ...station, ...outpost };
  return <div>{generic.label}</div>;
};

export default BerthDetails;
