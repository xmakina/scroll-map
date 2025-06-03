import React from "react";
import GameMap from "@/components/map/GameMap";
import { getShips } from "./queries";
import { createShip } from "./actions";

async function Page() {
  const ships = await getShips();
  const createShipFunc = createShip.bind(null);

  return (
    <div className="flex flex-col m-2 items-center justify-center w-full gap-3">
      <GameMap ships={ships} posix={[0, 0]} onCreateShip={createShipFunc} />
    </div>
  );
}

export default Page;
