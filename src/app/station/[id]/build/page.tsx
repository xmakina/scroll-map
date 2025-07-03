import { NavigationLink } from "@/components/ui/Navigation";
import React from "react";
import { getStation } from "../queries";
import CargoHoldSummary from "@/components/cargoHold/CargoHoldSummary";
import { startBuilding, startBuildingShip } from "./actions";
import BuildComponentList from "@/components/build/BuildComponentList";
import BuildStationShips from "@/components/station/BuildStationShips";
import { StationContextProvider } from "@/context/StationContext";
import getJsonData from "@/utils/getJsonData";
import StationComponentData from "@/models/JsonData/StationComponentData";
import { StationComponentCostsAndRequirements } from "@/models/CostAndRequirements/StationComponents";

type Props = { params: Promise<{ id: string }> };

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const handleBuildComponent = startBuilding.bind(null, id);
  const handleBuildShip = startBuildingShip.bind(null, id);

  const station = await getStation(id);
  const existingComponents = station.Components.map((c) => {
    const data = getJsonData<StationComponentData>(c.data);
    return { type: c.type, level: data.level };
  });

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row justify-between items-center w-[100vw]">
        <div>
          <NavigationLink href={`./`}>Back</NavigationLink>
        </div>
      </div>
      <div>Building at {id}</div>
      <CargoHoldSummary cargoHold={station.CargoHold} />
      <StationContextProvider station={station}>
        <BuildComponentList
          onBuildComponent={handleBuildComponent}
          isBusy={!!station.ActivityWorker.Activity}
          existing={existingComponents}
          catalogue={StationComponentCostsAndRequirements}
          availableResources={station.CargoHold}
        />
        <BuildStationShips
          onBuildShip={handleBuildShip}
          isBusy={!!station.ActivityWorker.Activity}
        />
      </StationContextProvider>
    </div>
  );
};

export default Page;
