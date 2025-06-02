import React from "react";
import GameMap from "@/components/GameMap";

function Page() {
  return (
    <div className="flex flex-col m-2 items-center justify-center w-full">
      <GameMap posix={[0, 0]} />
    </div>
  );
}

export default Page;
