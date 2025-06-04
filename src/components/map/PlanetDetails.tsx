import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";
import Button from "../ui/Button";

type Props = {
  planet: Planet;
  onStartMining: (planetId: string) => Promise<void> | void;
};

const PlanetDetails = ({ planet, onStartMining }: Props) => {
  const handleMining = onStartMining.bind(null, planet.id);

  return (
    <div className="flex flex-row justify-between gap-2">
      <div className="flex flex-row justify-start gap-2">
        <LabeledText label="Planet">{planet.id}</LabeledText>
        <LabeledText label="Type">{planet.type}</LabeledText>
      </div>
      <div className="flex justify-end">
        {planet.type !== "Habitable" && (
          <Button onClick={handleMining}>Mine</Button>
        )}
      </div>
    </div>
  );
};

export default PlanetDetails;
