import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";

type Props = {
  planet: Planet;
};

const PlanetDetails = ({ planet }: Props) => {
  return (
    <div className="flex flex-row justify-between gap-2 border border-white rounded-md p-2">
      <div className="flex flex-row justify-start gap-2">
        <LabeledText label="Planet">{planet.id}</LabeledText>
        <LabeledText label="Type">{planet.type}</LabeledText>
      </div>
    </div>
  );
};

export default PlanetDetails;
