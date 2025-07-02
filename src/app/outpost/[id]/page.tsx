import BuildMenu from "@/components/build/BuildMenu";
import Title from "@/components/ui/Title";
import { OutpostComponentCostsAndRequirements } from "@/models/CostAndRequirements/OutpostComponents";
import React from "react";
import { getOutpost } from "./queries";
import { getTranslations } from "next-intl/server";
import { ToLevelledComponent } from "@/utils/getRequirementsBreakdown";

type Props = { params: Promise<{ id: string }> };

const OutpostPage = async ({ params }: Props) => {
  const { id } = await params;
  const outpost = await getOutpost(id);
  const t = await getTranslations("OutpostDetails");

  const existing = outpost.Components.map(ToLevelledComponent);

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col items-center w-full">
        <Title>{t("Outpost {id}", { id })}</Title>
        <BuildMenu
          catalogue={OutpostComponentCostsAndRequirements}
          availableResources={outpost.CargoHold}
          existing={existing}
        />
      </div>
    </div>
  );
};

export default OutpostPage;
