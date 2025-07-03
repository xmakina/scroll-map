import React from "react";
import { getTranslations } from "next-intl/server";
import HabitableWorldSummary from "./HabitableWorldSummary";
import UninhabitableWorldSummary from "./UninhabitableWorldSummary";
type Props = { params: Promise<{ id: string }> };

const PlanetDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations("PlanetDetails");

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4 items-center">
        <div className="italic">{t("Planet {id}", { id })}</div>
        <HabitableWorldSummary id={id} />
        <UninhabitableWorldSummary id={id} />
      </div>
    </div>
  );
};

export default PlanetDetailsPage;
