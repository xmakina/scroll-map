import LevelledComponentData from "./LevelledComponentData";

export default class implements LevelledComponentData {
  public readonly dataType = "StationComponentData";

  constructor(public readonly level: number) {}
}
