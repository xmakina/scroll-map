import { getRandomWeightedKey } from "@/utils/getRandomWeightedKey";
import { PlantSymbol } from "@prisma/client";
import Rand from "rand-seed";

export default function generatePlants(rand: Rand): PlantSymbol[] {
  const resourceType = getRandomWeightedKey(rand, PlantWeightings);
  const type = PlantSymbol[resourceType];

  return [type];
}

const PlantWeightings: { [key in PlantSymbol]: number } = {
  GRAIN: 20,
  BERRY: 40,
};
