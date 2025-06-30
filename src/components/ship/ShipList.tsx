import React from "react";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import BorderedBox from "../ui/BorderedBox";
import LabeledText from "../ui/LabeledText";
import { useTranslations } from "next-intl";
import { NavigationLink } from "../ui/Navigation";

type Props = {
  ships: ShipWithActivityAndCargoHold[];
};

const ShipList = ({ ships }: Props) => {
  const t = useTranslations("ShipList");

  if (ships.length === 0) {
    return <div className="italic">Empty</div>;
  }

  return ships.map(async (ship) => (
    <BorderedBox key={ship.id} title={ship.label}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between items-center gap-2">
          <LabeledText label={t("Location")}>{ship.locationId}</LabeledText>
          {ship.ActivityWorker.Activity && (
            <LabeledText label={t("Current Job")}>
              {ship.ActivityWorker.Activity?.type}
            </LabeledText>
          )}
        </div>
        <div>
          <NavigationLink href={`/ship/${ship.id}`}>
            Take Control
          </NavigationLink>
        </div>
      </div>
    </BorderedBox>
  ));
};

export default ShipList;
