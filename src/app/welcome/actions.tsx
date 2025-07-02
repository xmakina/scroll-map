"use server";

import ShipService from "@/services/ShipService";
import { getPlayer } from "../queries";
import RNG from "@/models/RNG";
import Waypoint from "@/models/waypoint/Waypoint";
import WaypointService from "@/services/WaypointService";
import PlayerService from "@/services/PlayerService";
import { revalidatePath } from "next/cache";

const shipService = await ShipService.get();
const playerService = await PlayerService.get();

export async function placeShip(friendCode?: string) {
  if (friendCode) {
    await deployShipToFriend(friendCode);
  } else {
    await deployShipToRandom();
  }

  revalidatePath("/welcome", "page");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function deployShipToFriend(_friendCode: string) {
  throw new Error("Function not implemented.");
}

async function deployShipToRandom() {
  const { id: playerId } = await getPlayer();
  const players = await playerService.totalPlayers();
  const rng = new RNG(playerId);
  const x = players * rng.randomNumber(-30, 30);
  const y = players * rng.randomNumber(-30, 30);

  const waypoint = await WaypointService.FindWaypoint(
    rng,
    x,
    y,
    (t) =>
      t.exists &&
      t.stars.some((s) => s.planets.some((p) => p.type === "Habitable"))
  );

  return await deployShip(playerId, waypoint);
}

async function deployShip(playerId: string, waypoint: Waypoint) {
  return await shipService.createShip(playerId, waypoint.id, {
    hullType: "SCOUT",
    engine: {
      speed: 5,
      range: 5,
    },
    cargoHold: true,
    tractorBeam: true,
    dataType: "ShipData",
  });
}
