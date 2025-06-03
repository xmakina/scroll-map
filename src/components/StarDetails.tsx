import Star from "@/models/waypoint/Star";
import React, { ReactNode } from "react";
import LabeledText from "./ui/LabeledText";

type Props = {
  star: Star;
};

const StarDetails = ({ star }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <LabeledText label="Class">{star.starClass}</LabeledText>
      <LabeledText label="Temperature">{star.temperature}K</LabeledText>
    </div>
  );
};

export default StarDetails;

export type LabelProps = {
  label: string;
  children: ReactNode[] | ReactNode;
};
