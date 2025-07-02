"use client";

import Waypoint from "@/models/waypoint/Waypoint";
import React from "react";
import StarDetails from "./StarDetails";
import BorderedBox from "../ui/BorderedBox";

type Props = {
  x: number;
  y: number;
};

const WaypointSummary = ({ x, y }: Props) => {
  const waypoint = new Waypoint(x, y);
  return (
    <div>
      {waypoint.stars.map((s) => (
        <BorderedBox key={s.id} title={s.id}>
          <StarDetails star={s}></StarDetails>
        </BorderedBox>
      ))}
    </div>
  );
};

export default WaypointSummary;
