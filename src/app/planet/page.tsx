import React from "react";
import { getPlanets } from "./queries";
import { getPlayer } from "../queries";
import { NavigationLink } from "@/components/ui/Navigation";

const PlanetList = async () => {
  const player = await getPlayer();
  const planets = await getPlanets(player.id);
  return (
    <div>
      {planets.map((p) => (
        <NavigationLink key={p.id} href={`/planet/${p.id}`}>
          {p.id}
        </NavigationLink>
      ))}
    </div>
  );
};

export default PlanetList;
