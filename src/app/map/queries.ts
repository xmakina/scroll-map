"use server";

import ShipService from "@/services/ShipService";
import { getPlayer } from "../queries";

const shipService = await ShipService.get();

export async function getShips() {
  const player = await getPlayer();
  return shipService.getShips(player.id);
}
