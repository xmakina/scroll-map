"use server";

import ShipService from "@/services/ShipService";
import { getPlayer } from "../queries";
import StationService from "@/services/StationService";

const stationService = await StationService.get();
const shipService = await ShipService.get();

export async function getStations() {
  const player = await getPlayer();
  const stations = await stationService.getStations(player.id);
  const shipsAtStation = (
    await Promise.all(stations.map((s) => shipService.getAt(s.id)))
  ).flatMap((s) => s);

  return stations.map((station) => {
    const ships = shipsAtStation.filter(
      (ship) => ship.locationId === station.id
    ).length;
    return { ...station, ships };
  });
}
