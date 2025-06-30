import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "TravelData";
  constructor(public readonly locationId: string) {}
}
