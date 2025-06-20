import React from "react";
import GameMap from "@/components/map/GameMap";
import { getOtherStations, getMyStations } from "./queries";
import { createStation } from "./actions";

async function Page() {
  const stations = await getMyStations();
  const allStations = await getOtherStations();
  const handleCreateStation = createStation.bind(null);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <GameMap
        posix={[0, 0]}
        stations={stations}
        allStations={allStations}
        onDeployStation={handleCreateStation}
      />
    </div>
  );
}

export default Page;
