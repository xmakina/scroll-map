import Star from "@/models/waypoint/Star";
import React, { ReactNode } from "react";
import LabeledText from "../ui/LabeledText";
import PlanetDetails from "./PlanetDetails";
import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";

type Props = {
  star: Star;
  onStartMining?: (planetId: string, shipId: string) => Promise<void> | void;
  ships?: ShipWithActivityAndCargoHold[];
};

const StarDetails = ({ star, onStartMining = () => {}, ships = [] }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <LabeledText label="ID" column>
          {star.id}
        </LabeledText>
        <LabeledText label="Class" column>
          {star.starClass}
        </LabeledText>
        <LabeledText label="Temperature" column>
          {star.temperature}K
        </LabeledText>
      </div>
      <div className="flex flex-col items-center">
        <div>Planets:</div>
        <div className="flex flex-col gap-2">
          {star.planets.map((p) => (
            <PlanetDetails
              key={p.id}
              planet={p}
              onStartMining={onStartMining.bind(null, p.id)}
              ships={ships}
            />
          ))}
          {star.planets.length === 0 && <div className="italic">Empty</div>}
        </div>
      </div>
    </div>
  );
};

export default StarDetails;

export type LabelProps = {
  label: string;
  children: ReactNode[] | ReactNode;
};
