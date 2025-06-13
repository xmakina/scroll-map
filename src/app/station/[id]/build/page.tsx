import { NavigationLink } from "@/components/ui/Navigation";
import React from "react";
import { getStation } from "../queries";
import CargoHoldSummary from "@/components/cargoHold/CargoHoldSummary";
import { startBuilding } from "./actions";
import StationComponents from "@/components/station/StationComponents";

type Props = { params: Promise<{ id: string }> };

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const handleBuild = startBuilding.bind(null, id);
  const station = await getStation(id);
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row justify-between items-center w-[100vw]">
        <div>
          <NavigationLink href={`./`}>Back</NavigationLink>
        </div>
      </div>
      <div>Build Page for station {id}</div>
      <CargoHoldSummary cargoHold={station.CargoHold} />
      <StationComponents
        stationComponents={station.Components}
        cargoHold={station.CargoHold}
        onBuildComponent={handleBuild}
      />
    </div>
  );
};

export default Page;
