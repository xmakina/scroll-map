import { JsonValue } from "@prisma/client/runtime/library";
import getJsonData from "./getJsonData";

type LevelledComponent = {
  type: string;
  data: JsonValue;
};

type LevelledData = {
  dataType: "Immaterial";
  level: number;
};

export function getComponentLevel(
  components: LevelledComponent[],
  targetType: string
) {
  const component = components.find((s) => s.type === targetType)?.data;
  const level = component ? getJsonData<LevelledData>(component).level : 0;
  return level;
}
