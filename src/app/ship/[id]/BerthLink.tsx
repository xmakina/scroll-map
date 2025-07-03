import { NavigationLink } from "@/components/ui/Navigation";
import { LocationType } from "@/models/LocationType";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  locationType: LocationType;
  locationId: string;
};

const BerthLink = ({ locationId, locationType }: Props) => {
  const t = useTranslations("BerthLink");
  switch (locationType) {
    case "planet":
      return (
        <NavigationLink href={`/planet/${locationId}`}>
          {t("View planet")}
        </NavigationLink>
      );
    case "star":
    case "waypoint":
    case "unknown":
      return <></>;
  }
};

export default BerthLink;
