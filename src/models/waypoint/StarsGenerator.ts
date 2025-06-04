import Star from "./Star";
import range from "@/utils/range";
import RNG from "../RNG";

const StarCountWeightings: { [key: number]: number } = {
  1: 10000,
  2: 100,
  3: 1,
};

export default function (rng: RNG, waypointId: string): Star[] {
  const starCount = rng.getRandomWeightedKey(StarCountWeightings);
  return range(0, starCount)
    .map((index) => new Star(rng, index, waypointId))
    .toArray();
}
