"use server";

import AgentService from "@/services/AgentService";
import { NavigationDirection } from "@/types/NavigationDirection";
import { revalidatePath } from "next/cache";

export async function changeLocation(
  agentId: string,
  direction: NavigationDirection
) {
  console.log(`moving ${agentId} ${direction}`);

  const agentService = await AgentService.get();
  await agentService.moveAgent(agentId, direction);

  revalidatePath("/surroundings");
}
