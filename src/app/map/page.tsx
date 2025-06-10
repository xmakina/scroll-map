import React from "react";
import GameMap from "@/components/map/GameMap";
import { getStations } from "./queries";
import { createStation } from "./actions";

async function Page() {
  const stations = await getStations();
  const handleCreateStation = createStation.bind(null);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <GameMap
        posix={[0, 0]}
        stations={stations}
        onDeployStation={handleCreateStation}
      />
    </div>
  );
}

export default Page;
