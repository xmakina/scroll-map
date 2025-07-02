import React from "react";
import { getOutposts } from "./queries";
import OutpostList from "./OutpostList";
import { getPlayer } from "@/app/queries";
import { createOutpost } from "./actions";
import Button from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";
type Props = { params: Promise<{ id: string }> };

const PlanetDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations("PlanetDetails");
  const outposts = await getOutposts(id);
  const { id: playerId } = await getPlayer();
  const handleNewOutpost = createOutpost.bind(null, id);
  const ownedOutposts = outposts.filter((o) => o.playerId === playerId);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4">
        <OutpostList outposts={outposts} playerId={playerId} />
        {ownedOutposts.length === 0 && (
          <Button onClick={handleNewOutpost}>{t("Found outpost")}</Button>
        )}
      </div>
    </div>
  );
};

export default PlanetDetailsPage;
