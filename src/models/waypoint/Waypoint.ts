import Rand, { PRNG } from "rand-seed";
import maybe from "../../utils/maybe";
import StarsGenerator from "./StarsGenerator";
import PlanetsGenerator from "./PlanetsGenerator";
import Planet from "./Planet";
import Star from "./Star";

export default class Waypoint {
  public readonly exists: boolean;
  public readonly seed: string;
  public readonly xPos: number;
  public readonly yPos: number;
  public readonly stars: Star[] = [];
  public readonly planets: Planet[] = [];

  constructor(x: number, y: number) {
    this.seed = `${x}x, ${y}y`;
    const rand = new Rand(this.seed, PRNG.xoshiro128ss);

    this.exists = maybe(rand, 10);
    this.xPos = x;
    this.yPos = y;

    if (!this.exists) {
      return;
    }

    this.stars = StarsGenerator(rand);

    const hasPlanets = maybe(rand, 30);
    if (!hasPlanets) {
      return;
    }

    this.planets = PlanetsGenerator(rand);
  }
}
