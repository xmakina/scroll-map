import RNG from "../RNG";
import Planet from "./Planet";
import PlanetsGenerator from "./PlanetsGenerator";

export type StarClass = "O" | "B" | "A" | "F" | "G" | "K" | "M";

const StarClassWeightings: { [key in StarClass]: number } = {
  O: 3,
  B: 130000,
  A: 600000,
  F: 3000000,
  G: 7600000,
  K: 12100000,
  M: 76500000,
};

export default class Star {
  public readonly starClass: StarClass;
  public readonly temperature: number;
  public readonly radius: number;
  public readonly planets: Planet[];
  public readonly id: string;

  constructor(rng: RNG, index: number, waypointIdentifier: string) {
    const randomNumber = (start: number, end: number) =>
      rng.randomNumber(start, end);

    this.starClass = rng.getRandomWeightedKey(StarClassWeightings);
    this.id = `${waypointIdentifier}-${index}${this.starClass}`;
    switch (this.starClass) {
      case "O":
        this.temperature = randomNumber(25000, 50000);
        this.radius = randomNumber(6.6, 16);
        break;
      case "B":
        this.temperature = randomNumber(9700, 30000);
        this.radius = randomNumber(1.8, 6.6);
        break;
      case "A":
        this.temperature = randomNumber(7200, 9700);
        this.radius = randomNumber(1.4, 1.8);
        break;
      case "F":
        this.temperature = randomNumber(5700, 7200);
        this.radius = randomNumber(1.15, 1.4);
        break;
      case "G":
        this.temperature = randomNumber(4900, 5700);
        this.radius = randomNumber(0.96, 1.15);
        break;
      case "K":
        this.temperature = randomNumber(3400, 4900);
        this.radius = randomNumber(0.7, 1.96);
        break;
      case "M":
        this.temperature = randomNumber(2100, 3400);
        this.radius = randomNumber(0.3, 0.7);
        break;
    }

    this.planets = PlanetsGenerator(rng, this.id);
  }
}
