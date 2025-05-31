import { getAgents, getUserId } from "../queries";
import AgentNavigation from "@/components/AgentNavigation";
import { changeLocation } from "./actions";

export default async function Page() {
  const userId = await getUserId();
  const agents = await getAgents(userId);
  const activeAgent = agents[0];

  const changeAgentLocation = changeLocation.bind(null, activeAgent.id);

  return (
    <div className="flex flex-col justify-center gap-6 w-full h-full">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex justify-center">
          ({activeAgent.locationX}, {activeAgent.locationY})
        </div>
      </div>
      <div className="flex flex-col justify-center items-center"></div>
      <div className="flex mt-auto justify-center items-center flex-col">
        <AgentNavigation onChangeLocation={changeAgentLocation} />
      </div>
      <div>
        <a href="/map">Go to map</a>
      </div>
    </div>
  );
}
