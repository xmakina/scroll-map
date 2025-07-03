"use client";

import Button from "@/components/ui/Button";
import { useShipContext } from "@/context/ShipContext";
import BerthData from "@/models/JsonData/BerthData";
import { OutpostWithComponents } from "@/models/OutpostWithComponents";
import { ActivityType } from "@prisma/client";
import bindData from "@/utils/bindActivityData";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  outpost?: OutpostWithComponents;
};

const LandButton = ({ outpost }: Props) => {
  if (!outpost) {
    return <></>;
  }

  const t = useTranslations("OrderButton");

  const { ship, issueOrder } = useShipContext();
  if (!ship || !issueOrder || ship.ActivityWorker.Activity) {
    return <></>;
  }

  const alreadyHere = ship.outpostId === outpost.id;
  const hasLandingZone = outpost.Components.some(
    (c) => c.type === "MAKESHIFT_LAUNCH_PAD" || c.type === "LAUNCH_PAD"
  );

  if (alreadyHere) {
    return <></>;
  }

  if (!hasLandingZone) {
    return <div>No suitable landing zone</div>;
  }

  const data: BerthData = new BerthData(
    { outpostId: outpost.id },
    outpost.label
  );
  const handleClick = bindData(issueOrder, ActivityType.BERTH, data);
  return (
    <div>
      <Button onClick={handleClick}>
        {t(ActivityType.BERTH, { locationType: "outpost" })}
      </Button>
    </div>
  );
};

export default LandButton;
