"use server";

import { revalidatePath } from "next/cache";
import { getPlayer } from "../queries";
import ShipService from "@/services/ShipService";
import Planet from "@/models/waypoint/Planet";
import idToXY from "@/models/waypoint/idToXY";
import Waypoint from "@/models/waypoint/Waypoint";

const shipService = await ShipService.get();

export const createShip = async (xy: { x: number; y: number }) => {
  const player = await getPlayer();

  await shipService.createShip(player.id, xy);

  await revalidatePath("/map", "page");
};

export const startMining = async (planetId: string) => {
  console.log("start mining at", planetId);
  const planet = planetFromId(planetId);
  console.log({ planet });
};

function planetFromId(planetId: string): Planet {
  try {
    const [x, y] = idToXY(planetId);
    const [starIndex] = planetId.match(/\d+/gm)![2];
    const waypoint = new Waypoint(x, y);
    const [planetIndex] = planetId.match(/[\d]+$/)!;

    return waypoint.stars[parseInt(starIndex)].planets[parseInt(planetIndex)];
  } catch {
    throw Error(`Invalid planet id ${planetId}`);
  }
}
