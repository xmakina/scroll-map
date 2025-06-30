import BorderedBox from "@/components/ui/BorderedBox";
import ShipService from "@/services/ShipService";
import React from "react";
import { getPlayer } from "../queries";
import { getTranslations } from "next-intl/server";
import ShipList from "@/components/ship/ShipList";
import Title from "@/components/ui/Title";

const shipService = await ShipService.get();

const DashboardPage = async () => {
  const t = await getTranslations("Dashboard");

  const player = await getPlayer();
  const ships = await shipService.getShips(player.id);

  return (
    <div className="flex flex-col  gap-4">
      <Title>{t("Dashboard")}</Title>
      <div className="flex flex-col md:flex-row">
        <BorderedBox title={t("Ships")}>
          <ShipList ships={ships} />
        </BorderedBox>
      </div>
    </div>
  );
};

export default DashboardPage;
