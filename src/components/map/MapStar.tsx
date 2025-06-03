"use client";

import Waypoint from "@/models/waypoint/Waypoint";

import React, { useEffect, useState } from "react";
import { Rectangle as LeafletRectangle } from "leaflet";
import { Circle, Rectangle } from "react-leaflet";
import Rand, { PRNG } from "rand-seed";
import randomNumber from "@/utils/randomNumber";
import { StarClass } from "@/models/waypoint/Star";

const defaultWeight = 0;
const defaultColor = "";

type Props = {
  waypoint: Waypoint;
  onClick: (waypoint: Waypoint) => void;
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

export default function MapStar({ waypoint, onClick, selected }: Props) {
  const rand = new Rand(waypoint.seed, PRNG.xoshiro128ss);
  const [gridSquare, setGridSquare] = useState<LeafletRectangle | null>(null);

  useEffect(() => {
    if (selected) {
      return applyHighlight();
    }

    return removeHighlight();
  }, [selected]);

  function applyHighlight() {
    if (!gridSquare) {
      return;
    }

    console.log("applying highlight", waypoint.seed);

    gridSquare.setStyle({
      weight: 5,
      color: "#666",
      opacity: 1,
    });
  }

  function removeHighlight() {
    if (!gridSquare || selected) {
      applyHighlight();
      return;
    }

    gridSquare.setStyle({
      weight: defaultWeight,
      color: defaultColor,
    });
  }

  useEffect(() => {
    if (!gridSquare) {
      return;
    }

    console.log("events set", waypoint.seed);

    gridSquare.on("mouseover", applyHighlight);
    gridSquare.on("mouseout", removeHighlight);
    gridSquare.on("click", () => onClick(waypoint));
  }, [gridSquare]);

  const stars = waypoint.stars.map((star, index) => {
    const xOffset = randomNumber(rand, -300, 300) / 1000;
    const yOffset = randomNumber(rand, -300, 300) / 1000;

    return (
      <Circle
        key={waypoint.seed + index}
        center={[waypoint.yPos + yOffset, waypoint.xPos + xOffset]}
        radius={Math.max(star.radius, 0.5) / 16}
        fillColor={classColours[star.starClass]}
        opacity={1}
        color={defaultColor}
        weight={defaultWeight}
        fillOpacity={1}
      ></Circle>
    );
  });

  return (
    <Rectangle
      bounds={[
        [waypoint.yPos - 0.5, waypoint.xPos - 0.5],
        [waypoint.yPos + 0.5, waypoint.xPos + 0.5],
      ]}
      weight={selected ? 10 : 5}
      fillColor=""
      fillOpacity={0}
      color=""
      ref={setGridSquare}
    >
      {stars}
    </Rectangle>
  );
}
