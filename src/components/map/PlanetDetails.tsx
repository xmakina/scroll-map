import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";
import Button from "../ui/Button";
import idToXY from "@/models/waypoint/idToXY";
import { ShipWithActivity } from "@/repositories/ShipRepository";

type Props = {
  planet: Planet;
  onStartMining: (shipId: string) => Promise<void> | void;
  ships: ShipWithActivity[];
};

const PlanetDetails = ({ planet, onStartMining, ships }: Props) => {
  const [x, y] = idToXY(planet.id);

  const availableShips = ships
    .filter((s) => s.positionX === x && s.positionY === y)
    .filter((s) => !s.Worker.Activity);
  return (
    <div className="flex flex-row justify-between gap-2">
      <div className="flex flex-row justify-start gap-2">
        <LabeledText label="Planet">{planet.id}</LabeledText>
        <LabeledText label="Type">{planet.type}</LabeledText>
      </div>
      <div className="flex justify-end">
        {planet.type !== "Habitable" &&
          availableShips.map((s) => (
            <Button key={s.id} onClick={onStartMining.bind(null, s.id)}>
              Mine with {s.id}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default PlanetDetails;
