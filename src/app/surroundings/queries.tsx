"use server";

import LocationGenerator from "@/LocationGenerator";

export async function getGeneratedDetails(x: number, y: number) {
  return LocationGenerator(`x:${x} y:${y}`);
}
