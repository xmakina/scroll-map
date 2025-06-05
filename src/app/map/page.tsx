import React from "react";
import GameMap from "@/components/map/GameMap";
import { claimActivity, createShip, startMining } from "./actions";
import { getShips } from "./queries";

async function Page() {
  const handleCreateShip = createShip.bind(null);
  const handleMining = startMining.bind(null);
  const ships = await getShips();
  const handleClaim = claimActivity.bind(null);

  return (
    <div className="flex flex-col m-2 items-center justify-center w-full gap-3">
      <GameMap
        posix={[0, 0]}
        onCreateShip={handleCreateShip}
        onStartMining={handleMining}
        ships={ships}
        onClaim={handleClaim}
      />
    </div>
  );
}

export default Page;
