"use client";

import Waypoint from "@/models/waypoint/Waypoint";

import React, { useEffect, useState } from "react";
import { Circle as LeafletCircle, LeafletMouseEvent } from "leaflet";
import { Circle } from "react-leaflet";

type Props = {
  waypoint: Waypoint;
  onClick: (waypoint: Waypoint) => void;
};

function highlightFeature(e: LeafletMouseEvent) {
  const layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
  });

  layer.bringToFront();
}

const resetHighlight = (w: Waypoint) => (e: LeafletMouseEvent) => {
  const layer = e.target;

  layer.setStyle({
    weight: 0,
    color: w.colour,
  });
};

export default function MapStar({ waypoint, onClick }: Props) {
  const [circle, setCircle] = useState<LeafletCircle | null>(null);

  useEffect(() => {
    if (!circle) {
      return;
    }

    circle.on("mouseover", highlightFeature);
    circle.on("mouseout", resetHighlight(waypoint));
    circle.on("click", (e) => {
      highlightFeature(e);
      onClick(waypoint);
    });
  });

  return (
    <Circle
      key={waypoint.seed}
      center={[waypoint.yPos, waypoint.xPos]}
      radius={0.4}
      color={waypoint.colour}
      fillColor={waypoint.colour}
      opacity={1}
      fillOpacity={1}
      ref={setCircle}
    ></Circle>
  );
}
