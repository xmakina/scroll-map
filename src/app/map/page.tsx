import React from "react";
import GameMap from "@/components/GameMap";
import { getStars } from "./queries";

function Page() {
  return (
    <div className="mx-auto my-5 w-[98%] h-[480px]">
      <GameMap posix={[0, 0]} updateStars={getStars} />
    </div>
  );
}

export default Page;
