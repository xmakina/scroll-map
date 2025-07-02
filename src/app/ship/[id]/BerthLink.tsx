import { NavigationLink } from "@/components/ui/Navigation";
import { LocationType } from "@/models/LocationType";
import React from "react";

type Props = {
  locationType: LocationType;
  locationId: string;
};

const BerthLink = ({ locationId, locationType }: Props) => {
  switch (locationType) {
    case "planet":
      return (
        <NavigationLink href={`/planet/${locationId}`}>
          Planet Details
        </NavigationLink>
      );
    case "star":
    case "waypoint":
    case "unknown":
      return <></>;
  }
};

export default BerthLink;
