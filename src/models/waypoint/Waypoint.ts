import Rand from "rand-seed";
import maybe from "../../utils/maybe";
import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";
import randomNumber from "@/utils/randomNumber";

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

export default class Waypoint {
  public readonly exists: boolean;
  public readonly seed: string;
  public readonly xPos: number;
  public readonly yPos: number;
  public readonly class?: StarClass;
  public readonly temperature?: number;
  public readonly radius?: number;

  constructor(x: number, y: number) {
    this.seed = `${x}x, ${y}y`;
    const rand = new Rand(this.seed);

    this.exists = maybe(rand, 10);
    this.xPos = x;
    this.yPos = y;

    if (!this.exists) {
      return;
    }

    this.class = getRandomWeightedKey(rand, StarClassWeightings);
    switch (this.class) {
      case "O":
        this.temperature = randomNumber(rand, 25000, 50000);
        this.radius = randomNumber(rand, 6.6, 16);
        break;
      case "B":
        this.temperature = randomNumber(rand, 9700, 30000);
        this.radius = randomNumber(rand, 1.8, 6.6);
        break;
      case "A":
        this.temperature = randomNumber(rand, 7200, 9700);
        this.radius = randomNumber(rand, 1.4, 1.8);
        break;
      case "F":
        this.temperature = randomNumber(rand, 5700, 7200);
        this.radius = randomNumber(rand, 1.15, 1.4);
        break;
      case "G":
        this.temperature = randomNumber(rand, 4900, 5700);
        this.radius = randomNumber(rand, 0.96, 1.15);
        break;
      case "K":
        this.temperature = randomNumber(rand, 3400, 4900);
        this.radius = randomNumber(rand, 0.7, 1.96);
        break;
      case "M":
        this.temperature = randomNumber(rand, 2100, 3400);
        this.radius = randomNumber(rand, 0.3, 0.7);
        break;
    }
  }
}
