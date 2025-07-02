import JsonData from "./IActivityData";

export default class implements JsonData {
  public readonly dataType = "DeliveryData";

  constructor(public readonly locationId: string) {}
}
