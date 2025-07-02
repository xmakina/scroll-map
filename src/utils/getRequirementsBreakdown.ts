import { Requirements } from "@/models/CostAndRequirements/CostAndRequirements";
import { getComponentLevel } from "./getComponentLevel";
import { JsonValue } from "@prisma/client/runtime/library";
import getJsonData from "./getJsonData";
import LevelledComponentData from "@/models/JsonData/LevelledComponentData";

export type LevelledComponent = {
  type: string;
  level: number;
};

export function ToLevelledComponent({
  type,
  data,
}: {
  type: string;
  data: JsonValue | null;
}): LevelledComponent {
  const componentData = getJsonData<LevelledComponentData>(data);

  return { type, level: componentData.level };
}

export default function <T extends string>(
  requirements: Requirements<T>,
  components: LevelledComponent[]
) {
  const requiredComponents = Object.keys(requirements).map((p) => p as T);

  return requiredComponents.map((p) => ({
    componentType: p,
    required: requirements[p] || 0,
    level: getComponentLevel(components, p),
  }));
}
