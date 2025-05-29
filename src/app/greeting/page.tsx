import { getTranslations } from "next-intl/server";
import { getUser } from "../queries";

export default async function Greeting() {
  const t = await getTranslations("Greeting");
  const user = await getUser();

  return (
    <div>
      <div>{t("Greetings, {name}", { ...user })}</div>
    </div>
  );
}
