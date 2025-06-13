"use server";

import { revalidatePath } from "next/cache";
import { getPlayer } from "../queries";
import StationService from "@/services/StationService";
import WaypointFromId from "@/utils/WaypointFromId";

const stationService = await StationService.get();

export const createStation = async (waypointId: string) => {
  console.log("creating station", waypointId);
  const waypoint = WaypointFromId(waypointId);

  if (!waypoint) {
    return;
  }

  const { id: playerId } = await getPlayer();

  await stationService.createStation(
    { x: waypoint.xPos, y: waypoint.yPos },
    playerId
  );

  revalidatePath("/map", "page");
};
