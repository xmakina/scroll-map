import { NavigationLink } from "@/components/ui/Navigation";
import React from "react";
import { getPlayer } from "../queries";
import { getOutposts } from "./queries";

const OutpostList = async () => {
  const player = await getPlayer();
  const outposts = await getOutposts(player.id);
  return (
    <div>
      {outposts.map((o) => (
        <NavigationLink key={o.id} href={`/outpost/${o.id}`}>
          {o.label} @ {o.planetId}
        </NavigationLink>
      ))}
    </div>
  );
};

export default OutpostList;
