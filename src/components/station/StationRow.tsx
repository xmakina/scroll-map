import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import React from "react";
import { NavigationLink } from "../ui/Navigation";
import Button from "../ui/Button";

type Props = {
  station: StationWithComponentsAndWorker;
  onClick: () => void;
};

const StationRow = ({ station, onClick }: Props) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <NavigationLink href={`/station/${station.id}`}>
        Station {station.id}
      </NavigationLink>
      <Button onClick={onClick}>Find</Button>
    </div>
  );
};

export default StationRow;
