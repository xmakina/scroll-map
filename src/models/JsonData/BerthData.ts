import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "BerthData";

  constructor(public readonly locationId: string) {}
}
