import RNG from "./RNG";

describe("with RNG", () => {
  let subject: RNG;

  describe("with random weighted key function", () => {
    const testWeights = {
      Common: 5,
      Rare: 1,
    };

    describe("when getting a random weight", () => {
      beforeEach(() => {
        subject = new RNG("some-seed");
      });

      it("returns the common value", () => {
        expect(subject.getRandomWeightedKey(testWeights)).toEqual("Common");
      });

      it("can return the rare value", () => {
        let answer = "";
        while (answer != "Rare") {
          answer = subject.getRandomWeightedKey(testWeights);
        }

        expect(answer).toEqual("Rare");
      });
    });

    describe("when given a huge range", () => {
      const hugeWeights = {
        Common: 10000000000,
        Rare: 100000,
      };

      beforeEach(() => {
        subject = new RNG("some-seed");
      });

      it("returns the common value", () => {
        expect(subject.getRandomWeightedKey(hugeWeights)).toEqual("Common");
      });

      it("can return the rare value", () => {
        let answer = "";
        while (answer != "Rare") {
          answer = subject.getRandomWeightedKey(testWeights);
        }

        expect(answer).toEqual("Rare");
      });
    });
  });
});
