import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsAndWorker";
import React from "react";
import StationRow from "./StationRow";

type Props = {
  stations: (StationWithComponentsAndWorker & { ships: number })[];
  onDeployTug: (stationId: string) => Promise<void> | void;
};

const StationList = ({ stations, onDeployTug }: Props) => {
  return (
    <div className="flex flex-col justify-center">
      {stations.map((s) => {
        const handleDeployTug = onDeployTug.bind(null, s.id);
        return (
          <StationRow key={s.id} station={s} onDeployTug={handleDeployTug} />
        );
      })}
    </div>
  );
};

export default StationList;
