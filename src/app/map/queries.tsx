"use server";

import Waypoint from "@/models/waypoint/Waypoint";

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

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
}) => {
  console.log({ north, south, east, west });
  const rNorth = roundTo(north, 1);
  const rSouth = roundTo(south, 1);
  const rEast = roundTo(east, 1);
  const rWest = roundTo(west, 1);

  const yList = Array.from(range(rSouth, rNorth));
  const xList = Array.from(range(rWest, rEast));

  return yList
    .flatMap((y) => xList.map((x) => new Waypoint(x, y)))
    .filter((p) => p.exists)
    .map((w) => JSON.parse(JSON.stringify(w)));
};

function* range(start: number, stop: number, step = 1) {
  if (stop == null) {
    // one param defined
    stop = start;
    start = 0;
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield roundTo(i, 0);
  }
}
