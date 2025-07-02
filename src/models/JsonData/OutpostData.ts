import JsonData from "./IActivityData";

export default class implements JsonData {
  public readonly dataType = "OutpostData";

  constructor(public readonly planetId: string) {}
}
