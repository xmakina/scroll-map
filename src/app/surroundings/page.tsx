import { getTranslations } from "next-intl/server";
import { getAgents, getUserId } from "../queries";
import AgentNavigation from "@/components/AgentNavigation";
import { changeLocation } from "./actions";

export default async function Page() {
  const t = await getTranslations("Surroundings");
  const userId = await getUserId();
  const agents = await getAgents(userId);
  const activeAgent = agents[0];

  const changeAgentLocation = changeLocation.bind(null, activeAgent.id);

  return (
    <div>
      <div>
        {t("Plain")} ({activeAgent.locationX}, {activeAgent.locationY})
        <AgentNavigation
          onChangeLocation={changeAgentLocation}
        />
      </div>
    </div>
  );
}
