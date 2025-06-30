"use server";

import ShipService from "@/services/ShipService";
import WaypointService from "@/services/WaypointService";

const shipService = await ShipService.get();

export async function getPlanets(playerId: string) {
  const allShips = await shipService.getShips(playerId);
  const uniqueLocations = [...new Set(allShips.map((s) => s.locationId))];
  const planets = uniqueLocations
    .map((id) => ({ id, type: WaypointService.GetType(id) }))
    .filter((t) => t.type === "planet");

  return planets;
}
