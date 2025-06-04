"use client";

import Waypoint from "@/models/waypoint/Waypoint";

import React, { ReactElement, useEffect, useState } from "react";
import { Rectangle as LeafletRectangle } from "leaflet";
import { Circle, Rectangle } from "react-leaflet";
import { StarClass } from "@/models/waypoint/Star";

const defaultWeight = 0;
const defaultColor = "";

type Props = {
  waypoint: Waypoint;
  onClick: (waypoint: Waypoint) => Promise<void> | void;
  selected?: boolean;
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

export default function MapStar({
  waypoint,
  onClick,
  selected = false,
}: Props) {
  const [stars, setStars] = useState<ReactElement[]>([]);

  const [gridSquare, setGridSquare] = useState<LeafletRectangle | null>(null);

  useEffect(() => {
    if (!gridSquare) {
      return;
    }

    gridSquare.on("click", () => onClick(waypoint));

    if (waypoint.stars.length === 0) {
      return;
    }

    const rng = waypoint.rng;
    const starList = waypoint.stars.map((star, index) => {
      const left = rng.maybe(50);
      const xOffset = (rng.randomNumber(0, 300) / 1000) * (left ? -1 : 1);
      const bottom = rng.maybe(50);
      const yOffset = (rng.randomNumber(0, 300) / 1000) * (bottom ? -1 : 1);

      return (
        <Circle
          key={waypoint.seed + index}
          center={[waypoint.yPos + yOffset, waypoint.xPos + xOffset]}
          radius={Math.max(star.radius, 0.5) / 16}
          fillColor={classColours[star.starClass]}
          color=""
          weight={0}
          opacity={1}
          fillOpacity={1}
        ></Circle>
      );
    });

    setStars(starList);
  }, [gridSquare]);

  return (
    <Rectangle
      bounds={[
        [waypoint.yPos - 0.5, waypoint.xPos - 0.5],
        [waypoint.yPos + 0.5, waypoint.xPos + 0.5],
      ]}
      fillColor=""
      fillOpacity={0}
      color={selected ? "#666" : defaultColor}
      weight={selected ? 5 : defaultWeight}
      ref={setGridSquare}
    >
      {stars}
    </Rectangle>
  );
}
