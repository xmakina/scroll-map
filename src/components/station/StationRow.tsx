import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsAndWorker";
import React from "react";

type Props = {
  station: StationWithComponentsAndWorker;
};

const StationRow = ({ station }: Props) => {
  return <div>{station.id}</div>;
};

export default StationRow;
