import Rand from "rand-seed";
import Star from "./Star";
import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";
import range from "@/utils/range";

const StarCountWeightings: { [key: number]: number } = {
  1: 10000,
  2: 100,
  3: 1,
};

export default function (rand: Rand): Star[] {
  const starCount = getRandomWeightedKey(rand, StarCountWeightings);
  return range(0, starCount)
    .map(() => new Star(rand))
    .toArray();
}
