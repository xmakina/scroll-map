import Rand from "rand-seed";
import { getRandomWeightedKey } from "./getRandomWeightedKey";

describe("with random weighted key function", () => {
  let rand: Rand;
  const testWeights = {
    Common: 5,
    Rare: 1,
  };

  describe("when getting a random weight", () => {
    beforeEach(() => {
      rand = new Rand("some-seed");
    });

    it("returns the common value", () => {
      expect(getRandomWeightedKey(rand, testWeights)).toEqual("Common");
    });

    it("can return the rare value", () => {
      let answer = "";
      while (answer != "Rare") {
        answer = getRandomWeightedKey(rand, testWeights);
      }

      expect(answer).toEqual("Rare");
    });
  });

  describe("when given a huge range", () => {
    let rand: Rand;

    const hugeWeights = {
      Common: 10000000000,
      Rare: 100000,
    };

    beforeEach(() => {
      rand = new Rand("some-seed");
    });

    it("returns the common value", () => {
      expect(getRandomWeightedKey(rand, hugeWeights)).toEqual("Common");
    });

    it("can return the rare value", () => {
      let answer = "";
      while (answer != "Rare") {
        answer = getRandomWeightedKey(rand, testWeights);
      }

      expect(answer).toEqual("Rare");
    });
  });
});
