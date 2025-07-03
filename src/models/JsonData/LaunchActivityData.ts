import JsonData from "./IActivityData";

export default class implements JsonData {
  public readonly dataType = "LaunchActivityData";

  constructor(public readonly label: string) {}
}
