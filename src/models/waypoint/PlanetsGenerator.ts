import range from "@/utils/range";
import Planet from "./Planet";
import RNG from "../RNG";

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

export default function (rng: RNG, starIdentifier: string) {
  const hasPlanets = rng.maybe(30);
  if (!hasPlanets) {
    return [];
  }

  const planetCount = rng.getRandomWeightedKey(PlanetCountWeightings);

  return range(0, planetCount)
    .map((index) => new Planet(rng, index, starIdentifier))
    .toArray();
}
