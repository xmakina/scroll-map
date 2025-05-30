"use server";

import Waypoint from "@/models/waypoint/Waypoint";

export async function getGeneratedDetails(x: number, y: number) {
  return new Waypoint(x, y);
}
