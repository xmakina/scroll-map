import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import React from "react";
import StationRow from "./StationRow";

type Props = {
  stations: StationWithComponentsAndWorker[];
};

const StationList = ({ stations }: Props) => {
  return (
    <div className="flex flex-col justify-center">
      {stations.map((s) => {
        return <StationRow key={s.id} station={s} />;
      })}
    </div>
  );
};

export default StationList;
