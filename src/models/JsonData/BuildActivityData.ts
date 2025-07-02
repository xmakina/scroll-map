import { Cost } from "../CostAndRequirements/CostAndRequirements";
import IActivityData from "./IActivityData";

export default class<T extends string> implements IActivityData {
  public readonly dataType = "BuildActivityData";

  constructor(
    public readonly type: T,
    public readonly level: number,
    public readonly cost: Cost
  ) {}
}
