import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "OutpostData";

  constructor(public readonly planetId: string) {}
}
