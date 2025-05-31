"use server";

import AgentService from "@/services/AgentService";
import { NavigationDirection } from "@/types/NavigationDirection";
import { PlantSymbol } from "@prisma/client";
import { revalidatePath } from "next/cache";

const agentService = await AgentService.get();

export async function changeLocation(
  agentId: string,
  direction: NavigationDirection
) {
  console.log(`moving ${agentId} ${direction}`);
  await agentService.moveAgent(agentId, direction);

  revalidatePath("/surroundings");
}

export async function plantInteraction(agentId: string, p: PlantSymbol) {
  console.log(`${agentId} interacting with plant ${p}`);
  await agentService.interaction("harvest", p);
  revalidatePath("/surroundings");
}
