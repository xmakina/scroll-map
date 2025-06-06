import Planet from "@/models/waypoint/Planet";
import WaypointFromId from "./WaypointFromId";

export default function PlanetFromId(planetId: string): Planet | undefined {
  try {
    const waypoint = WaypointFromId(planetId);
    if (!waypoint) {
      return;
    }

    const [starIndex] = planetId.match(/\d+/gm)![2];
    const [planetIndex] = planetId.match(/[\d]+$/)!;

    return waypoint.stars[parseInt(starIndex)].planets[parseInt(planetIndex)];
  } catch {
    return;
  }
}
