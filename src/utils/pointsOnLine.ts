import Rand from "rand-seed";
import randomNumber from "./randomNumber";
import { roundTo } from "./roundTo";

export default function* pointsOnLine(
  rand: Rand,
  start: number,
  stop: number,
  minStep: number
) {
  for (
    let i = start;
    minStep > 0 ? i < stop : i > stop;
    i += minStep + randomNumber(rand, 0, stop - i)
  ) {
    yield roundTo(i, 3);
  }
}
