import Waypoint from "@/models/waypoint/Waypoint";
import React, { ReactNode } from "react";

type Props = {
  star: Waypoint;
};

const StarDetails = ({ star }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-4">
        <Label label="X">{star.xPos}</Label>
        <Label label="Y">{star.yPos}</Label>
      </div>
      <Label label="Class">{star.class}</Label>
      <Label label="Temperature">{star.temperature}K</Label>
    </div>
  );
};

export default StarDetails;

type LabelProps = {
  label: string;
  children: ReactNode[] | ReactNode;
};

const Label = ({ label, children }: LabelProps) => {
  return (
    <div className="flex flex-row justify-between gap-2">
      <div>{label}:</div>
      <div>{children}</div>
    </div>
  );
};
