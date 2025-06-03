import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";
import range from "@/utils/range";
import Rand from "rand-seed";
import Planet from "./Planet";
import randomNumber from "@/utils/randomNumber";

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

export default function (rand: Rand) {
  const planetCount = getRandomWeightedKey(rand, PlanetCountWeightings);
  return range(0, planetCount)
    .map((index) => randomNumber(rand, 2, 4) * index)
    .map((distance) => new Planet(rand, distance))
    .toArray();
}
