import idToXY from "@/models/waypoint/idToXY";
import Waypoint from "@/models/waypoint/Waypoint";

export default function WaypointFromId(waypointId: string): Waypoint {
  const [x, y] = idToXY(waypointId);
  const waypoint = new Waypoint(x, y);

  return waypoint;
}
