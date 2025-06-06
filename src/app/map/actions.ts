"use server";

import { revalidatePath } from "next/cache";
import { getPlayer } from "../queries";
import StationService from "@/services/StationService";
import ShipService from "@/services/ShipService";
import WaypointFromId from "@/utils/WaypointFromId";
import PlanetFromId from "@/utils/PlanetFromId";

const stationService = await StationService.get();
const shipService = await ShipService.get();

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

export const deployTug = async (stationId: string) => {
  console.log("deploying tug", stationId);
  const { id: playerId } = await getPlayer();
  await shipService.createShip(playerId, stationId, {
    speed: 0,
    cargoCapacity: 100,
  });

  await stationService.updateStation(stationId, { tugDeployed: true });
  revalidatePath("/map", "page");
};

export const startMining = async (planetId: string, shipId: string) => {
  const planet = PlanetFromId(planetId);
  if (!planet) {
    return;
  }

  await shipService.startMining({ shipId, type: "MINE", planetId });
  revalidatePath("/map", "page");
};

export const claimActivity = async (shipId: string, activityId: string) => {
  await shipService.claimActivity(shipId, activityId);
  revalidatePath("/map", "page");
};
