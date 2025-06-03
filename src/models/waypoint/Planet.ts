import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";
import range from "@/utils/range";
import Rand from "rand-seed";
import Moon from "./Moon";

const moonWeightings = {
  0: 20,
  1: 40,
  2: 20,
  3: 5,
};

export default class Planet {
  public readonly id: string;
  public readonly moons: Moon[];

  constructor(
    rand: Rand,
    public readonly index: number,
    public readonly starId: string
  ) {
    this.id = `${starId}-${index}`;
    const numberOfMoons = getRandomWeightedKey(rand, moonWeightings);
    this.moons = range(0, numberOfMoons)
      .map((index) => new Moon(rand, index, this.id))
      .toArray();
  }
}
