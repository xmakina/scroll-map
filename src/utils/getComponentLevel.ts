import { LevelledComponent } from "./getRequirementsBreakdown";

export function getComponentLevel(
  components: LevelledComponent[],
  targetType: string
) {
  const component = components.find((s) => s.type === targetType);
  const level = component ? component.level : 0;
  return level;
}
