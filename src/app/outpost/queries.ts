"use server";

import OutpostService from "@/services/OutpostService";

const outpostService = await OutpostService.get();

export async function getOutposts(playerId: string) {
  return await outpostService.getAllForPlayer(playerId);
}
