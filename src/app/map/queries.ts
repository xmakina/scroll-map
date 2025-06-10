"use server";

import { getPlayer } from "../queries";
import StationService from "@/services/StationService";

const stationService = await StationService.get();

export async function getStations() {
  const player = await getPlayer();
  return await stationService.getStations(player.id);
}
