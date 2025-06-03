"use client";
import Waypoint from "@/models/waypoint/Waypoint";
import range from "@/utils/range";
import { roundTo } from "@/utils/roundTo";

export const getStars = async ({
  north,
  south,
  east,
  west,
}: {
  north: number;
  south: number;
  east: number;
  west: number;
}): Promise<Waypoint[]> => {
  const rNorth = roundTo(north, 1);
  const rSouth = roundTo(south, 1);
  const rEast = roundTo(east, 1);
  const rWest = roundTo(west, 1);

  const yList = Array.from(range(rSouth, rNorth));
  const xList = Array.from(range(rWest, rEast));

  const start = Date.now();
  return new Promise((resolve) => {
    const result = yList
      .flatMap((y) => xList.map((x) => new Waypoint(x, y)))
      .filter((p) => p.exists)
      .map((w) => w);

    const end = Date.now();
    console.log("getting stars took", end - start);
    resolve(result);
  });
};
