"use client";

import Waypoint from "@/models/waypoint/Waypoint";
import React from "react";
import StarDetails from "./StarDetails";

type Props = {
  x: number;
  y: number;
};

const WaypointSummary = ({ x, y }: Props) => {
  const waypoint = new Waypoint(x, y);
  return (
    <div>
      {waypoint.stars.map((s) => (
        <StarDetails key={s.id} star={s}></StarDetails>
      ))}
    </div>
  );
};

export default WaypointSummary;
