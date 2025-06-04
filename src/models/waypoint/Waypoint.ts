import StarsGenerator from "./StarsGenerator";
import Star from "./Star";
import RNG from "../RNG";

export default class Waypoint {
  public readonly exists: boolean;
  public readonly seed: string;
  public readonly xPos: number;
  public readonly yPos: number;
  public readonly id: string;
  public readonly stars: Star[] = [];
  public readonly rng: RNG;

  constructor(x: number, y: number) {
    this.seed = `${x}x, ${y}y`;
    this.rng = new RNG(this.seed);
    const { maybe, randomLetter } = this.rng;

    this.exists = maybe(10);
    this.xPos = x;
    this.yPos = y;

    const firstLetter = randomLetter();
    const secondLetter = randomLetter();

    this.id = `${firstLetter}${this.xPos}${secondLetter}${this.yPos}`;
    if (!this.exists) {
      return;
    }

    this.stars = StarsGenerator(this.rng, this.id);
  }
}
