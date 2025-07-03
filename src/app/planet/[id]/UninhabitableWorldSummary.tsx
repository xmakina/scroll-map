import React from "react";
import { getTranslations } from "next-intl/server";
import PlanetFromId from "@/utils/PlanetFromId";

type Props = {
  id: string;
};

const UninhabitableWorldSummary = async ({ id }: Props) => {
  const planet = PlanetFromId(id);
  if (planet?.type === "Habitable") {
    return <></>;
  }

  const t = await getTranslations("PlanetDetails");
  return (
    <div>
      <div className="italic">{t("Life is not supported here")}</div>
    </div>
  );
};

export default UninhabitableWorldSummary;
