import React from "react";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import BorderedBox from "../ui/BorderedBox";
import LabeledText from "../ui/LabeledText";
import { useTranslations } from "next-intl";
import { NavigationLink } from "../ui/Navigation";
import { clsx } from "clsx";

type Props = {
  ships: ShipWithActivityAndCargoHold[];
  showLocation?: boolean;
  row?: boolean;
};

const ShipList = ({ ships, showLocation = true, row = false }: Props) => {
  const t = useTranslations("ShipList");

  if (ships.length === 0) {
    return <div className="italic">Empty</div>;
  }

  return ships.map(async (ship) => (
    <BorderedBox key={ship.id} title={ship.label}>
      <div className="flex flex-col gap-4">
        <div
          className={clsx("flex flex-col justify-between items-center gap-2", {
            "flex-row": row,
          })}
        >
          {showLocation && (
            <LabeledText label={t("Location")}>{ship.locationId}</LabeledText>
          )}
          {ship.ActivityWorker.Activity && (
            <LabeledText label={t("Current Job")}>
              {ship.ActivityWorker.Activity?.type}
            </LabeledText>
          )}
          <NavigationLink href={`/ship/${ship.id}`}>
            Take Control
          </NavigationLink>
        </div>
      </div>
    </BorderedBox>
  ));
};

export default ShipList;
