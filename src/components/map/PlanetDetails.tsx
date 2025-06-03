import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";
import MoonDetails from "./MoonDetails";

type Props = {
  planet: Planet;
};

const PlanetDetails = ({ planet }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <LabeledText label="Planet">{planet.id}</LabeledText>
      <div className="flex flex-col">
        {planet.moons.map((m) => (
          <MoonDetails key={m.id} moon={m} />
        ))}
      </div>
    </div>
  );
};

export default PlanetDetails;
