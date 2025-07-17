import BuildMenu from "@/components/build/BuildMenu";
import Title from "@/components/ui/Title";
import { OutpostComponentCostsAndRequirements } from "@/models/CostAndRequirements/OutpostComponents";
import React from "react";
import { getOutpost } from "./queries";
import { getTranslations } from "next-intl/server";
import { ToLevelledComponent } from "@/utils/getRequirementsBreakdown";
import { claimActivityForOutpost, startBuilding } from "./actions";
import ActivityDetails from "@/components/activity/ActivityDetails";
import ComponentList from "@/components/component/ComponentList";
import ShipList from "@/components/ship/ShipList";
import BorderedBox from "@/components/ui/BorderedBox";

type Props = { params: Promise<{ id: string }> };

const OutpostPage = async ({ params }: Props) => {
  const { id } = await params;
  const outpost = await getOutpost(id);
  const t = await getTranslations("OutpostDetails");

  const existing = outpost.Components.map(ToLevelledComponent);

  const handleBuildComponent = startBuilding.bind(null, id);
  const handleClaim = claimActivityForOutpost.bind(null, id);

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col items-center w-full gap-4">
        <Title>{t("Outpost {id}", { id: outpost.label })}</Title>
        {outpost.ActivityWorker.Activity && (
          <ActivityDetails
            activity={outpost.ActivityWorker.Activity}
            onClaim={handleClaim}
          />
        )}
        <BuildMenu
          catalogue={OutpostComponentCostsAndRequirements}
          availableResources={outpost.CargoHold}
          existing={existing}
          onBuildComponent={handleBuildComponent}
          isBusy={!!outpost.ActivityWorker.Activity}
        />
        <ComponentList
          title={t("Outpost Structures")}
          components={outpost.Components}
        />
        <BorderedBox title={t("Ships")}>
          <ShipList ships={outpost.Ships} showLocation={false} />
        </BorderedBox>
      </div>
    </div>
  );
};

export default OutpostPage;
