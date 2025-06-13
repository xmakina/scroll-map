"use server";

import { StationComponentType } from "@prisma/client";

export const startBuilding = async (
  stationId: string,
  componentType: StationComponentType
) => {
  console.log(`Station ${stationId} requested to build ${componentType}`);
};
