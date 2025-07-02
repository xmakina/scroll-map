import LevelledComponentData from "./LevelledComponentData";

export default class implements LevelledComponentData {
  public readonly dataType = "OutpostComponentType";

  constructor(public readonly level: number) {}
}
