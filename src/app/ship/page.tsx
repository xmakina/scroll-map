import React from "react";
import { getPlayer } from "../queries";
import { getShips } from "./queries";
import BorderedBox from "@/components/ui/BorderedBox";
import { getTranslations } from "next-intl/server";
import ShipSummary from "@/components/ship/ShipSummary";

const ShipList = async () => {
  const t = await getTranslations("ShipList");
  const player = await getPlayer();
  const ships = await getShips(player.id);

  return (
    <BorderedBox title={t("Ships")}>
      <div className="flex flex-col md:flex-row gap-2">
        {ships.map((s) => (
          <ShipSummary key={s.id} ship={s} location control />
        ))}
      </div>
    </BorderedBox>
  );
};

export default ShipList;
