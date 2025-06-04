import Rand, { PRNG } from "rand-seed";

const lowercaseAsciiStart = 97;

export default class RNG {
  private readonly rand: Rand;
  public readonly seed: string;

  constructor(seed: string) {
    this.rand = new Rand(seed, PRNG.xoshiro128ss);
    this.seed = seed;
  }

  maybe = (chance: number) => this.randomNumber(0, 100) < chance;

  randomNumber = (min: number, max: number) =>
    Math.floor(this.rand.next() * (max - min + 1) + min);

  randomLetter = () => {
    const letterIndex = this.randomNumber(0, 25);
    const letter = String.fromCharCode(lowercaseAsciiStart + letterIndex);
    return letter;
  };

  getRandomWeightedKey<T extends string | number>(weightings: {
    [key in T]: number;
  }) {
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

    const random = this.randomNumber(0, total);

    let runningTotal = 0;
    const result = weighedElements.reduce<T | null>((acc, weighedElement) => {
      if (acc) {
        return acc;
      }

      runningTotal += weighedElement.weight;

      if (runningTotal >= random) {
        return weighedElement.key as T;
      }

      return null;
    }, null);

    if (result === null) {
      throw Error("Unexpected null from weighted results");
    }

    return result;
  }
}
