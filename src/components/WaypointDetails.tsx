import React from "react";
import LabeledText from "./ui/LabeledText";
import Waypoint from "@/models/waypoint/Waypoint";

type Props = {
  waypoint: Waypoint;
};

const WaypointDetails = ({ waypoint }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <LabeledText label="X">{waypoint.xPos}</LabeledText>
      <LabeledText label="Y">{waypoint.yPos}</LabeledText>
    </div>
  );
};

export default WaypointDetails;
