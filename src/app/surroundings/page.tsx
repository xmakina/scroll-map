import { getAgents, getUserId } from "../queries";
import AgentNavigation from "@/components/AgentNavigation";
import { changeLocation, plantInteraction } from "./actions";
import { getGeneratedDetails } from "./queries";
import Button from "@/components/ui/Button";

export default async function Page() {
  const userId = await getUserId();
  const agents = await getAgents(userId);
  const activeAgent = agents[0];

  const changeAgentLocation = changeLocation.bind(null, activeAgent.id);
  const interactWithPlant = plantInteraction.bind(null, activeAgent.id);

  const generatedLocation = await getGeneratedDetails(
    activeAgent.locationX,
    activeAgent.locationY
  );

  return (
    <div className="flex flex-col justify-center gap-6 w-full h-full">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex justify-center">
          ({activeAgent.locationX}, {activeAgent.locationY})
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        {generatedLocation.plants.map((p) => {
          const interaction = interactWithPlant.bind(null, p);
          return <Button onClick={interaction}>Pick {p}</Button>;
        })}
      </div>
      <div className="flex mt-auto justify-center items-center flex-col">
        <AgentNavigation onChangeLocation={changeAgentLocation} />
      </div>
      <div>
        <a href="/map">Go to map</a>
      </div>
    </div>
  );
}
