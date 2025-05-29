import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const t = await getTranslations("Greeting");
  const session = await auth();
  if (session?.user) {
    return redirect("/greeting");
  }

  return (
    <div>
      <p>{t("Unknown")}</p>
    </div>
  );
}
