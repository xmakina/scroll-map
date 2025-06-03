import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";
import range from "@/utils/range";
import Rand from "rand-seed";
import Planet from "./Planet";
import maybe from "@/utils/maybe";

const PlanetCountWeightings: { [key: number]: number } = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 60,
  6: 50,
  7: 40,
  8: 30,
  9: 20,
  10: 10,
};

export default function (rand: Rand, starIdentifier: string) {
  const hasPlanets = maybe(rand, 30);
  if (!hasPlanets) {
    return [];
  }

  const planetCount = getRandomWeightedKey(rand, PlanetCountWeightings);

  return range(0, planetCount)
    .map((index) => new Planet(rand, index, starIdentifier))
    .toArray();
}
