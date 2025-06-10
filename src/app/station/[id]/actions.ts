"use server";

import { getPlayer } from "@/app/queries";
import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const stationService = await StationService.get();

export const deployTug = async (stationId: string) => {
  console.log("deploying tug", stationId);
  const { id: playerId } = await getPlayer();
  await shipService.createShip(playerId, stationId, {
    speed: 0,
    cargoCapacity: 100,
  });

  await stationService.updateStation(stationId, { tugDeployed: true });
  revalidatePath("/station/[id]", "page");
};
