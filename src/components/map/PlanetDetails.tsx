import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";
import Button from "../ui/Button";
import { usePlayerShipsContext } from "@/context/PlayerShipsContext";
import { CargoType } from "@prisma/client";
import { MiningData } from "@/models/MiningData";

type Props = {
  planet: Planet;
};

function getMiningTypeFromPlanet(planet: Planet) {
  switch (planet.type) {
    case "Rock":
      return CargoType.ORE;
    case "Gas":
      return CargoType.GAS;
    case "Ice":
      return CargoType.ICE;
    case "Habitable":
      throw new Error("You cannot mine habitable worlds");
  }
}

const PlanetDetails = ({ planet }: Props) => {
  const { ships, issueOrder } = usePlayerShipsContext();
  const availableShips = ships.filter((s) => !s.ActivityWorker.Activity);

  const handleMine = issueOrder.bind(null, "MINE");

  return (
    <div className="flex flex-row justify-between gap-2 border border-white rounded-md p-2">
      <div className="flex flex-row justify-start gap-2">
        <LabeledText label="Planet">{planet.id}</LabeledText>
        <LabeledText label="Type">{planet.type}</LabeledText>
      </div>
      <div className="flex justify-end flex-col">
        {planet.type !== "Habitable" &&
          availableShips.map((s) => {
            const type = getMiningTypeFromPlanet(planet);
            const data: MiningData = { type };
            return (
              <Button key={s.id} onClick={handleMine.bind(null, s.id, data)}>
                Mine with {s.label}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default PlanetDetails;
