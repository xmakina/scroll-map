import Rand from "rand-seed";

export default class Planet {
  constructor(rand: Rand, public readonly distance: number) {}
}
