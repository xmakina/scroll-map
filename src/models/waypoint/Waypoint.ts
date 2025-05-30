import Rand from "rand-seed";
import maybe from "../../utils/maybe";
import { PlantSymbol, ResourceSymbol } from "@prisma/client";
import generateResources from "./generateResources";
import generatePlants from "./generatePlants";

export default class Waypoint {
  public readonly resources: ResourceSymbol[];
  public readonly plants: PlantSymbol[];

  constructor(x: number, y: number) {
    const seed = `${x}x, ${y}y`;
    const rand = new Rand(seed);

    this.resources = addSymbols(rand, 20, generateResources);
    this.plants = addSymbols(rand, 40, generatePlants);
  }
}

function addSymbols<T>(
  rand: Rand,
  chance: number,
  generator: (rand: Rand) => T[]
) {
  const hasSymbol = maybe(rand, chance);
  if (hasSymbol) {
    return generator(rand);
  }

  return [];
}
