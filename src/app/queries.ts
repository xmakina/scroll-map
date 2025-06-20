import { auth } from "@/auth";
import PlayerService from "@/services/PlayerService";
import { redirect } from "next/navigation";

const playerService = await PlayerService.get();

export async function getUser() {
  const session = await auth();
  if (!session) {
    return undefined;
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

export async function getPlayer() {
  const user = await getUser();
  if (!user?.id) {
    return redirect("/");
  }

  return await playerService.findPlayer(user.id);
}

export async function tryGetPlayer() {
  const user = await getUser();
  if (!user?.id) {
    return undefined;
  }

  return await playerService.findPlayer(user.id);
}
