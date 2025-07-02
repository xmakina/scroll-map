import JsonData from "./IActivityData";

export default abstract class implements JsonData {
  abstract dataType: string;

  constructor(public readonly level: number) {}
}
