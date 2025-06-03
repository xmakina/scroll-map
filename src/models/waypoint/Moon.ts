import Rand from "rand-seed";

export default class Moon {
  public readonly id: string;
  constructor(rand: Rand, index: number, planetId: string) {
    this.id = `${planetId}:${index}`;
  }
}
