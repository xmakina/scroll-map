"use server";

import { revalidatePath } from "next/cache";
import { getPlayer } from "../queries";
import ShipService from "@/services/ShipService";

const shipService = await ShipService.get();

export const createShip = async (xy: { x: number; y: number }) => {
  const player = await getPlayer();

  await shipService.createShip(player.id, xy);

  await revalidatePath("/map", "page");
};
