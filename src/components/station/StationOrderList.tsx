import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import React from "react";

type Props = { station: StationWithComponentsAndWorker };

const StationOrderList = ({ station }: Props) => {
  return <div>{station.id}</div>;
};

export default StationOrderList;
