"use server";

import { revalidatePath } from "next/cache";
import { getPlayer } from "../queries";
import ShipService from "@/services/ShipService";
import { planetFromId } from "../../utils/planetFromId";

const shipService = await ShipService.get();

export const createShip = async (xy: { x: number; y: number }) => {
  console.log("creating ship", xy);
  const player = await getPlayer();

  await shipService.createShip(player.id, xy);

  await revalidatePath("/map", "page");
};

export const startMining = async (planetId: string, shipId: string) => {
  const planet = planetFromId(planetId);
  if (!planet) {
    return;
  }

  await shipService.startMining({ shipId, type: "MINE", planetId });
  await revalidatePath("/map", "page");
};

export const claimActivity = async (shipId: string, activityId: string) => {
  await shipService.claimActivity(shipId, activityId);
  await revalidatePath("/map", "page");
};
