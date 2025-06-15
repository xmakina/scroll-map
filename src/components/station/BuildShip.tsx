import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { StationComponent } from "@prisma/client";
import React from "react";

type Props = {
  shipKey: string;
  cargoHold: CargoHoldWithContainers;
  stationComponents: StationComponent[];
  onBuildShip: () => Promise<void> | void;
};

const BuildShip = ({ shipKey }: Props) => {
  return <div>Build {shipKey}</div>;
};

export default BuildShip;
