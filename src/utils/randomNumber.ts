import Rand from "rand-seed";

const randomNumber = (rand: Rand, min: number, max: number) =>
  Math.floor(rand.next() * (max - min + 1)) + min;

export default randomNumber;
