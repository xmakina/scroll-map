import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "DeliveryData";

  constructor(public readonly locationId: string) {}
}
