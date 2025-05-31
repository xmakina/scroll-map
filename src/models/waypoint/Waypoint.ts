import Rand from "rand-seed";
import maybe from "../../utils/maybe";
import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";

type StarColour = "#FFFFFF" | "#22FF" | "#FFFF00";

const StarColourWeightings: { [key in StarColour]: number } = {
  "#FFFFFF": 20,
  "#22FF": 20,
  "#FFFF00": 80,
};

export default class Waypoint {
  public readonly exists: boolean;
  public readonly seed: string;
  public readonly xPos: number;
  public readonly yPos: number;
  public readonly colour?: StarColour;

  constructor(x: number, y: number) {
    this.seed = `${x}x, ${y}y`;
    const rand = new Rand(this.seed);

    this.exists = maybe(rand, 20);
    this.xPos = x;
    this.yPos = y;

    if (!this.exists) {
      return;
    }

    this.colour = getRandomWeightedKey(rand, StarColourWeightings);
  }
}
