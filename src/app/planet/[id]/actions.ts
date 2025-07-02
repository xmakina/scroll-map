"use server";

import { getPlayer } from "@/app/queries";
import OutpostService from "@/services/OutpostService";
import { revalidatePath } from "next/cache";

const outpostService = await OutpostService.get();

export async function createOutpost(locationId: string) {
  const player = await getPlayer();
  await outpostService.create(player.id, locationId);

  revalidatePath("/planet/[id]", "page");
}
