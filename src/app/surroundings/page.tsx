import { getTranslations } from "next-intl/server";
import { getAgents, getUserId } from "../queries";
import AgentNavigation from "@/components/AgentNavigation";
import { changeLocation } from "./actions";
import { getGeneratedDetails } from "./queries";

export default async function Page() {
  const t = await getTranslations("Surroundings");
  const userId = await getUserId();
  const agents = await getAgents(userId);
  const activeAgent = agents[0];

  const changeAgentLocation = changeLocation.bind(null, activeAgent.id);

  const generatedLocation = await getGeneratedDetails(
    activeAgent.locationX,
    activeAgent.locationY
  );

  return (
    <div>
      <div>{JSON.stringify(generatedLocation)}</div>
      <div>
        {t("Plain")} ({activeAgent.locationX}, {activeAgent.locationY})
        <AgentNavigation onChangeLocation={changeAgentLocation} />
      </div>
    </div>
  );
}
