import { auth } from "@/auth";
import AgentService from "@/services/AgentService";
import { redirect } from "next/navigation";

const agentService = await AgentService.get();

export async function getUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  return session.user;
}
export async function getUserId() {
  const user = await getUser();

  if (!user?.id) {
    return redirect("/");
  }

  return user.id;
}

export async function getAgents(userId: string) {
  return await agentService.findAgents(userId);
}
