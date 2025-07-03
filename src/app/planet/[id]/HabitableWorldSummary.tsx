import { getPlayer } from "@/app/queries";
import Button from "@/components/ui/Button";
import React from "react";
import { createOutpost } from "./actions";
import OutpostList from "./OutpostList";
import { getOutposts } from "./queries";
import { getTranslations } from "next-intl/server";
import PlanetFromId from "@/utils/PlanetFromId";

type Props = {
  id: string;
};

const HabitableWorldSummary = async ({ id }: Props) => {
  const planet = PlanetFromId(id);
  if (planet?.type !== "Habitable") {
    return <></>;
  }

  const t = await getTranslations("PlanetDetails");
  const outposts = await getOutposts(id);
  const { id: playerId } = await getPlayer();
  const handleNewOutpost = createOutpost.bind(null, id);
  const ownedOutposts = outposts.filter((o) => o.playerId === playerId);
  return (
    <div>
      <OutpostList outposts={outposts} />
      {ownedOutposts.length === 0 && (
        <Button onClick={handleNewOutpost}>{t("Found outpost")}</Button>
      )}
    </div>
  );
};

export default HabitableWorldSummary;
