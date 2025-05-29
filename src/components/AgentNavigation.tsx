import React from "react";
import Button from "./ui/Button";
import { NavigationDirection } from "@/types/NavigationDirection";

type Props = {
  onChangeLocation: (direction: NavigationDirection) => Promise<void>;
};

function AgentNavigation({ onChangeLocation }: Props) {
  const goNorth = onChangeLocation.bind(null, "N");
  const goSouth = onChangeLocation.bind(null, "S");
  const goWest = onChangeLocation.bind(null, "W");
  const goEast = onChangeLocation.bind(null, "E");

  return (
    <div className="flex-col w-full">
      <div className="flex justify-center">
        <Button onClick={goNorth}>Go North</Button>
      </div>
      <div className="flex justify-between gap-12">
        <Button onClick={goWest}>Go West</Button>
        <Button onClick={goEast}>Go East</Button>
      </div>

      <div className="flex justify-center">
        <Button onClick={goSouth}>Go South</Button>
      </div>
    </div>
  );
}

export default AgentNavigation;
