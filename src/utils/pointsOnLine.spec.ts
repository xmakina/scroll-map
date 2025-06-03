import Rand from "rand-seed";
import pointsOnLine from "./pointsOnLine";

describe("with points on a line", () => {
  describe("when getting a list of points", () => {
    it("returns the expected number of points", () => {
      const rand = new Rand("some-seed");
      const result = pointsOnLine(rand, 1, 100, 2).toArray();
      expect(result).toEqual([1, 22, 70, 86, 95]);
    });
  });
});
