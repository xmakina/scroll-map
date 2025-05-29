import Rand from "rand-seed";
import randomNumber from "./randomNumber";

const maybe = (rand: Rand, chance: number) =>
  randomNumber(rand, 0, 100) < chance;

export default maybe;
