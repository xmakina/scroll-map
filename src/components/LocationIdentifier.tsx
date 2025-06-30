import WaypointService from "@/services/WaypointService";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  locationId: string;
};

const LocationIdentifier = ({ locationId }: Props) => {
  const t = useTranslations("LocationIdentifier");
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-2 justify-between">
        <div>
          {t("Location")}: {locationId}
        </div>
        <div>{t(WaypointService.GetType(locationId))}</div>
      </div>
    </div>
  );
};

export default LocationIdentifier;
