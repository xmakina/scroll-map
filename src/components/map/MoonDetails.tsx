import Moon from "@/models/waypoint/Moon";
import React from "react";

type Props = {
  moon: Moon;
};

const MoonDetails = ({ moon }: Props) => {
  return <div>{moon.id}</div>;
};

export default MoonDetails;
