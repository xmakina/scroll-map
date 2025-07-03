import Planet from "@/models/waypoint/Planet";
import React from "react";
import LabeledText from "../ui/LabeledText";
import Travel from "../orders/Travel";
import { useShipContext } from "@/context/ShipContext";
import clsx from "clsx";

type Props = {
  planet: Planet;
};

const PlanetDetails = ({ planet }: Props) => {
  const { ship } = useShipContext();
  return (
    <div
      className={clsx(
        "flex flex-row justify-between gap-2 border border-white rounded-md p-2",
        {
          "bg-green-950": ship?.locationId === planet.id,
        }
      )}
    >
      <div className="flex flex-row justify-between gap-2 grow">
        <LabeledText label="Planet">{planet.id}</LabeledText>
        <LabeledText label="Type">{planet.type}</LabeledText>
        <Travel locationId={planet.id} />
      </div>
    </div>
  );
};

export default PlanetDetails;
