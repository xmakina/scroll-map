import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";
import { ResourceSymbol } from "@prisma/client";
import Rand from "rand-seed";

export default function generateResources(rand: Rand): ResourceSymbol[] {
  const resourceType = getRandomWeightedKey(rand, ResourceWeightings);
  const type = ResourceSymbol[resourceType];

  return [type];
}

const ResourceWeightings: { [key in ResourceSymbol]: number } = {
  IRON: 1,
  CLAY: 5,
};
