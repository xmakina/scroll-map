import JsonData from "./IActivityData";

export default class implements JsonData {
  public readonly dataType = "BerthData";

  constructor(public readonly locationId: string) {}
}
