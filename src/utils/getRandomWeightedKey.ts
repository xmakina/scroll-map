import Rand from "rand-seed";
import randomNumber from "./randomNumber";

export function getRandomWeightedKey<T extends string>(
  rand: Rand,
  weightings: { [key in T]: number }
) {
  const elements = Object.keys(weightings);
  const weights = Object.values<number>(weightings);

  const weighedElements = [];
  let currentElement = 0;
  while (currentElement < elements.length) {
    for (let i = 0; i < weights[currentElement]; i++) {
      weighedElements[weighedElements.length] = elements[currentElement];
    }
    currentElement++;
  }

  const random = randomNumber(rand, 0, weighedElements.length);
  return weighedElements[random] as T;
}
