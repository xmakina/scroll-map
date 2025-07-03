import { getOutposts } from "@/app/planet/[id]/queries";
import BorderedBox from "@/components/ui/BorderedBox";
import LabeledText from "@/components/ui/LabeledText";
import { getTranslations } from "next-intl/server";
import React from "react";
import LandButton from "./LandButton";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import PlanetFromId from "@/utils/PlanetFromId";

type Props = {
  ship: ShipWithActivityAndCargoHold;
};

const HabitableWorldSummary = async ({ ship }: Props) => {
  const t = await getTranslations("Planet Details");
  const { locationId } = ship;

  const planet = PlanetFromId(locationId);
  if (planet?.type !== "Habitable") {
    return <></>;
  }

  const outposts = await getOutposts(locationId);
  return (
    <BorderedBox title={t("Outposts")}>
      <div className="flex flex-col items-center">
        {outposts.length === 0 && <div className="italic">None</div>}
        {outposts.map((o) => (
          <div key={o.id} className="flex flex-col gap-2 items-center">
            <LabeledText label={t("Name")}>{o.label}</LabeledText>
            <div className="flex flex-col items-center">
              <LandButton outpost={o} />
            </div>
          </div>
        ))}
      </div>
    </BorderedBox>
  );
};

export default HabitableWorldSummary;
