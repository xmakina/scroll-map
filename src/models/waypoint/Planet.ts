import range from "@/utils/range";
import Moon from "./Moon";
import RNG from "../RNG";

const moonWeightings: { [key in PlanetType]: { [key: number]: number } } = {
  Rock: {
    0: 20,
    1: 40,
    2: 20,
    3: 5,
  },
  Gas: {
    0: 10,
    1: 10,
    2: 10,
    3: 20,
    4: 30,
    5: 50,
    6: 40,
    7: 30,
    8: 20,
    9: 10,
  },
  Ice: {
    0: 90,
    1: 10,
  },
  Habitable: {
    0: 10,
    1: 60,
    2: 20,
  },
};

type PlanetType = "Rock" | "Gas" | "Ice" | "Habitable";

const planetTypeWeightings: { [key in PlanetType]: number } = {
  Rock: 50,
  Gas: 40,
  Ice: 20,
  Habitable: 10,
};

export default class Planet {
  public readonly id: string;
  public readonly type: PlanetType;
  public readonly moons: Moon[];

  constructor(
    rng: RNG,
    public readonly index: number,
    public readonly starId: string
  ) {
    this.id = `${starId}-${index}`;
    this.type = rng.getRandomWeightedKey(planetTypeWeightings);
    const numberOfMoons = rng.getRandomWeightedKey(moonWeightings[this.type]);
    this.moons = range(0, numberOfMoons)
      .map((index) => new Moon(rng, index, this.id))
      .toArray();
  }
}
