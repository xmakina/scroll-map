"use server";

import OutpostService from "@/services/OutpostService";

const outpostService = await OutpostService.get();

export async function getOutpost(outpostId: string) {
  return await outpostService.get(outpostId);
}
