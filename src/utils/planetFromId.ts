import idToXY from "@/models/waypoint/idToXY";
import Planet from "@/models/waypoint/Planet";
import Waypoint from "@/models/waypoint/Waypoint";

export function planetFromId(planetId: string): Planet | undefined {
  try {
    const [x, y] = idToXY(planetId);
    const [starIndex] = planetId.match(/\d+/gm)![2];
    const waypoint = new Waypoint(x, y);
    const [planetIndex] = planetId.match(/[\d]+$/)!;

    return waypoint.stars[parseInt(starIndex)].planets[parseInt(planetIndex)];
  } catch {
    return;
  }
}
