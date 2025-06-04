import idToSeed from "./idToXY";
import Waypoint from "./Waypoint";

describe("with id to seed", () => {
  it("converts the id to an x y pair", () => {
    const waypoint = new Waypoint(1, 1);
    const result = idToSeed(waypoint.id);
    expect(result).toEqual([1, 1]);
  });

  it("converts the id to an x y pair", () => {
    const waypoint = new Waypoint(-1, 1);
    const result = idToSeed(waypoint.id);
    expect(result).toEqual([-1, 1]);
  });

  it("converts the id to an x y pair", () => {
    const waypoint = new Waypoint(1, -1);
    const result = idToSeed(waypoint.id);
    expect(result).toEqual([1, -1]);
  });
});
