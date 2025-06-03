import Rand, { PRNG } from "rand-seed";
import maybe from "../../utils/maybe";
import StarsGenerator from "./StarsGenerator";
import Star from "./Star";
import { randomLetter } from "@/utils/randomLetter";

export default class Waypoint {
  public readonly exists: boolean;
  public readonly seed: string;
  public readonly xPos: number;
  public readonly yPos: number;
  public readonly id: string;
  public readonly stars: Star[] = [];

  constructor(x: number, y: number) {
    this.seed = `${x}x, ${y}y`;
    const rand = new Rand(this.seed, PRNG.xoshiro128ss);

    this.exists = maybe(rand, 10);
    this.xPos = x;
    this.yPos = y;

    const firstLetter = randomLetter(rand);
    const secondLetter = randomLetter(rand);

    this.id = `${firstLetter}${this.xPos}${secondLetter}${this.yPos}`;
    if (!this.exists) {
      return;
    }

    this.stars = StarsGenerator(rand, this.id);
  }
}
