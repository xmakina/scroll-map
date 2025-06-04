import RNG from "../RNG";

export default class Moon {
  public readonly id: string;
  constructor(rng: RNG, index: number, planetId: string) {
    this.id = `${planetId}:${index}`;
  }
}
