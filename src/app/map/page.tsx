import React from "react";
import GameMap from "@/components/GameMap";

function Page() {
  return (
    <div className="mx-auto my-5 w-[98%] h-[480px]">
      <GameMap posix={[0, 0]} />
    </div>
  );
}

export default Page;
