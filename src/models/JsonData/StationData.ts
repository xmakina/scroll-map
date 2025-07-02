import JsonData from "./IActivityData";

export default class implements JsonData {
  public readonly dataType = "StationData";
  
  constructor(public readonly vaultSize: number) {}
}
