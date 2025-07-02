import IActivityData from "./IActivityData";

export default class<T extends string> implements IActivityData {
  public readonly dataType = "BuildActivityData";

  constructor(public readonly level: number, public readonly type: T) {}
}
