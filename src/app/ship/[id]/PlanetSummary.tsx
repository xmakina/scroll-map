import { getOutposts } from "@/app/planet/[id]/queries";
import BorderedBox from "@/components/ui/BorderedBox";
import { getTranslations } from "next-intl/server";
import React from "react";
import BerthLink from "./BerthLink";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import BerthButton from "@/components/orders/BerthButton";
import LabeledText from "@/components/ui/LabeledText";
import DockedHere from "./DockedHere";

type Props = {
  ship: ShipWithActivityAndCargoHold;
};

const PlanetSummary = async ({ ship }: Props) => {
  const t = await getTranslations("Planet Details");
  const { locationId } = ship;
  const outposts = await getOutposts(locationId);

  return (
    <div className="flex flex-col items-center">
      <BorderedBox title={t("Outposts")}>
        <div className="flex flex-col items-center">
          {outposts.length === 0 && <div className="italic">None</div>}
          {outposts.map((o) => (
            <div key={o.id} className="flex flex-col gap-2 items-center">
              <LabeledText label={t("Name")}>{o.label}</LabeledText>
              <div className="flex flex-col items-center">
                <BerthButton location={{ outpostId: o.id }} />
                <DockedHere locationId={o.id} />
              </div>
            </div>
          ))}
        </div>
      </BorderedBox>
      <BerthLink locationType={"planet"} locationId={locationId} />
    </div>
  );
};

export default PlanetSummary;
