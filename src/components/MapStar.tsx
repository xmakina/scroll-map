"use client";

import Waypoint, { StarClass } from "@/models/waypoint/Waypoint";

import React, { useEffect, useState } from "react";
import { Circle as LeafletCircle, LeafletMouseEvent } from "leaflet";
import { Circle } from "react-leaflet";
import Rand from "rand-seed";
import randomNumber from "@/utils/randomNumber";

const defaultWeight = 0;
const defaultColor = "";

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
    weight: defaultWeight,
    color: defaultColor,
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

  const rand = new Rand(waypoint.seed);

  const xOffset = randomNumber(rand, 10, 90) / 100;
  const yOffset = randomNumber(rand, 10, 90) / 100;

  return (
    <Circle
      key={waypoint.seed}
      center={[waypoint.yPos + yOffset, waypoint.xPos + xOffset]}
      radius={waypoint.radius / 16}
      fillColor={classColours[waypoint.class]}
      opacity={1}
      color={defaultColor}
      weight={defaultWeight}
      fillOpacity={1}
      ref={setCircle}
    ></Circle>
  );
}
