import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";
import Button from "../ui/Button";
import { usePlayerShipsContext } from "@/context/PlayerShipsContext";
import { CargoType } from "@prisma/client";

type Props = {
  planet: Planet;
};

const PlanetDetails = ({ planet }: Props) => {
  const { ships, issueOrder } = usePlayerShipsContext();
  const availableShips = ships.filter((s) => !s.ActivityWorker.Activity);

  const handleMine = issueOrder.bind(null, "MINE");

  return (
    <div className="flex flex-row justify-between gap-2">
      <div className="flex flex-row justify-start gap-2">
        <LabeledText label="Planet">{planet.id}</LabeledText>
        <LabeledText label="Type">{planet.type}</LabeledText>
      </div>
      <div className="flex justify-end">
        {planet.type !== "Habitable" &&
          availableShips.map((s) => (
            <Button
              key={s.id}
              onClick={handleMine.bind(null, s.id, { type: CargoType.ORE })}
            >
              Mine with {s.label}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default PlanetDetails;
