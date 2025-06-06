import { StationData } from "@/models/StationData";
import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsAndWorker";
import React from "react";
import Button from "../ui/Button";

type Props = {
  station: StationWithComponentsAndWorker & { ships: number };
  onDeployTug: () => Promise<void> | void;
};

const StationRow = ({ station, onDeployTug }: Props) => {
  const data: StationData = (station.data as StationData) || {};
  return (
    <div className="flex flex-col gap-2 items-center">
      <div>Station {station.id}</div>
      <div className="flex flex-row justify-center">
        {!data.tugDeployed && (
          <div>
            <Button onClick={onDeployTug}>Deploy Tug</Button>
          </div>
        )}
        {station.ships > 0 && <div>Manage ships</div>}
      </div>
    </div>
  );
};

export default StationRow;
