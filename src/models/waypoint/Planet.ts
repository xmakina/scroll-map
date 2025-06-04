import range from "@/utils/range";
import Moon from "./Moon";
import RNG from "../RNG";

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
    rng: RNG,
    public readonly index: number,
    public readonly starId: string
  ) {
    this.id = `${starId}-${index}`;
    const numberOfMoons = rng.getRandomWeightedKey(moonWeightings);
    this.moons = range(0, numberOfMoons)
      .map((index) => new Moon(rng, index, this.id))
      .toArray();
  }
}
