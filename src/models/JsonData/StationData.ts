import JsonData from "./IActivityData";

export default class implements JsonData {
  dataType = "StationData";
  constructor(public readonly vaultSize: number) {}
}
