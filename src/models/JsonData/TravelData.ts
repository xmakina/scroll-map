import JsonData from "./IActivityData";

export default class implements JsonData {
  public readonly dataType = "TravelData";

  constructor(public readonly locationId: string) {}
}
