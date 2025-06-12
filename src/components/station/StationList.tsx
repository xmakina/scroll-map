import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import React from "react";
import StationRow from "./StationRow";

type Props = {
  stations: StationWithComponentsAndWorker[];
  onZoom: (stationId: string) => void;
};

const StationList = ({ stations, onZoom }: Props) => {
  return (
    <div className="flex flex-col justify-center">
      {stations.map((s) => {
        return <StationRow key={s.id} station={s} onClick={onZoom.bind(null, s.id)} />;
      })}
    </div>
  );
};

export default StationList;
