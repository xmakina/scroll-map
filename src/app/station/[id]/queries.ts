"use server";

import ShipService from "@/services/ShipService";
import StationService from "@/services/StationService";

const stationService = await StationService.get();
const shipService = await ShipService.get();

export const getStation = async (id: string) => await stationService.get(id);

export const getShips = async (id: string) => await shipService.getAt(id);

export const getOrders = async (id: string) => await shipService.getOrders(id);
