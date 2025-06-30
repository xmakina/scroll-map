import RNG from "@/models/RNG";
import Waypoint from "@/models/waypoint/Waypoint";

function findWaypoint(
  rng: RNG,
  x: number,
  y: number,
  resolve: (
    value: Waypoint | PromiseLike<Waypoint | undefined> | undefined
  ) => void,
  matcher: (target: Waypoint) => boolean
) {
  let waypoint = new Waypoint(x, y);
  let newX = x;
  let newY = y;

  for (let shortCircuit = 100; shortCircuit > 0; shortCircuit--) {
    const xWobble = rng.randomNumber(-5, 5);
    const yWobble = rng.randomNumber(-5, 5);
    newX += xWobble;
    newY += yWobble;

    waypoint = new Waypoint(newX, newY);
    if (matcher(waypoint)) {
      return resolve(waypoint);
    }
  }

  return resolve(undefined);
}

export default class {
  static GetType(locationId: string) {
    const [, isWaypoint, isStar, isPlanet] = locationId.match(/-?\d+/gm)!;

    if (isPlanet) {
      return "planet";
    }
    if (isStar) {
      return "star";
    }

    if (isWaypoint) {
      return "waypoint";
    }

    return "unknown";
  }

  static async FindWaypoint(
    rng: RNG,
    x: number,
    y: number,
    matcher: (target: Waypoint) => boolean,
    shortCircuit = 0
  ): Promise<Waypoint> {
    if (shortCircuit > 100) {
      throw new Error("Unable to find a waypoint");
    }

    const waypoint = await new Promise<Waypoint | undefined>((resolve) =>
      findWaypoint(rng, x, y, resolve, matcher)
    );

    if (!waypoint) {
      return await this.FindWaypoint(
        rng,
        x + rng.randomNumber(-10, 10),
        y + rng.randomNumber(-10, 10),
        matcher,
        shortCircuit++
      );
    }

    return waypoint;
  }
}
