"use client";

import Waypoint, { StarClass } from "@/models/waypoint/Waypoint";

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

  if (!w.class) {
    return;
  }

  layer.setStyle({
    weight: 0,
    color: classColours[w.class],
  });
};

const classColours: { [key in StarClass]: string } = {
  O: "#9bb0ff",
  B: "#aabfff",
  A: "#cad7ff",
  F: "#f8f7ff",
  G: "#fff4ea",
  K: "#ffd2a1",
  M: "#ffcc6f",
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

  if (!waypoint.class || !waypoint.radius) {
    return <></>;
  }

  return (
    <Circle
      key={waypoint.seed}
      center={[waypoint.yPos, waypoint.xPos]}
      radius={waypoint.radius / 16}
      color={classColours[waypoint.class]}
      fillColor={classColours[waypoint.class]}
      opacity={1}
      fillOpacity={1}
      ref={setCircle}
    ></Circle>
  );
}
