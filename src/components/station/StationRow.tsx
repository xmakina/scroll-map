import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import React from "react";
import { NavigationLink } from "../ui/Navigation";

type Props = {
  station: StationWithComponentsAndWorker;
};

const StationRow = ({ station }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <NavigationLink href={`/station/${station.id}`}>
        Station {station.id}
      </NavigationLink>
    </div>
  );
};

export default StationRow;
