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
    weighedElements[weighedElements.length] = {
      key: elements[currentElement],
      weight: weights[currentElement],
    };
    currentElement++;
  }

  const total = weights.reduce((acc, weight) => (acc += weight));

  const random = randomNumber(rand, 0, total);

  let runningTotal = 0;
  const result = weighedElements.reduce<T | null>((acc, weighedElement) => {
    if (acc) {
      return acc;
    }

    runningTotal += weighedElement.weight;

    if (runningTotal > random) {
      return weighedElement.key as T;
    }

    return null;
  }, null);

  if (result === null) {
    throw Error("Unexpected null from weighted results");
  }

  return result;
}
