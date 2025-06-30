export abstract class UnknownData {
  abstract readonly dataType: string;
}

export default class extends UnknownData {
  dataType = "BerthData";
  constructor(public readonly locationId: string) {
    super();
  }
}
