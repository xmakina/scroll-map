import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";
import Button from "../ui/Button";
import { CargoType } from "@prisma/client";
import { useShipContext } from "@/context/ShipContext";
import Travel from "../orders/Travel";
import BerthButton from "../orders/BerthButton";
import MiningData from "@/models/JsonData/MiningData";

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
  const { ship, issueOrder } = useShipContext();
  const availableShip = !ship?.ActivityWorker.Activity;

  const handleMine = issueOrder.bind(null, "MINE");

  return (
    <div className="flex flex-row justify-between gap-2 border border-white rounded-md p-2">
      <div className="flex flex-row justify-start gap-2">
        <LabeledText label="Planet">{planet.id}</LabeledText>
        <LabeledText label="Type">{planet.type}</LabeledText>
      </div>
      <div className="flex justify-end flex-col">
        {planet.type !== "Habitable" &&
          availableShip &&
          ship?.locationId === planet.id && (
            <MiningButton planet={planet} handleMine={handleMine} />
          )}
        {planet.type === "Habitable" && <Travel locationId={planet.id} />}
        <BerthButton locationId={planet.id} />
      </div>
    </div>
  );
};

export default PlanetDetails;

const MiningButton = ({
  planet,
  handleMine,
}: {
  planet: Planet;
  handleMine: (data: MiningData) => Promise<void>;
}) => {
  const { ship: s } = useShipContext();
  if (s === undefined) {
    return <></>;
  }

  const type = getMiningTypeFromPlanet(planet);
  const data: MiningData = { type, dataType: "MiningData" };
  return (
    <Button key={s.id} onClick={handleMine.bind(null, data)}>
      Mine
    </Button>
  );
};
