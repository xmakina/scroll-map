import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  return session.user;
}
