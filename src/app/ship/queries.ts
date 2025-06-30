"use server";

import ShipService from "@/services/ShipService";

const shipService = await ShipService.get();

export async function getShips(playerId: string) {
  return await shipService.getShips(playerId);
}
