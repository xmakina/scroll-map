import Rand from "rand-seed";
import maybe from "./utils/maybe";
import randomNumber from "./utils/randomNumber";

export default function LocationGenerator(seed: string) {
  const rand = new Rand(seed);
  return GenerateResources(rand);
}

type Location = {
  resource?: string;
};

type GeneratorFunction = (rand: Rand, next?: GeneratorFunction) => Location;

function GenerateResources(rand: Rand): Location {
  const hasResource = maybe(rand, 50);
  if (!hasResource) {
    return {};
  }

  const resourceScore = randomNumber(rand, 0, 100);
  if (resourceScore < 20) {
    return { resource: "Iron" };
  }

  return { resource: "Clay" };
}
