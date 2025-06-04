"use server";

import { revalidatePath } from "next/cache";
import { getPlayer } from "../queries";
import ShipService from "@/services/ShipService";
import Planet from "@/models/waypoint/Planet";
import idToXY from "@/models/waypoint/idToXY";
import Waypoint from "@/models/waypoint/Waypoint";

const shipService = await ShipService.get();

export const createShip = async (xy: { x: number; y: number }) => {
  console.log("creating ship", xy);
  const player = await getPlayer();

  await shipService.createShip(player.id, xy);

  await revalidatePath("/map", "page");
};

export const startMining = async (planetId: string, shipId: string) => {
  console.log("start mining at : with", planetId, shipId);
  const planet = planetFromId(planetId);
  if (!planet) {
    return;
  }

  await shipService.startWork(shipId, "MINE", {}, 10 * 1000);
};

function planetFromId(planetId: string): Planet | undefined {
  try {
    const [x, y] = idToXY(planetId);
    const [starIndex] = planetId.match(/\d+/gm)![2];
    const waypoint = new Waypoint(x, y);
    const [planetIndex] = planetId.match(/[\d]+$/)!;

    return waypoint.stars[parseInt(starIndex)].planets[parseInt(planetIndex)];
  } catch {
    return;
  }
}
