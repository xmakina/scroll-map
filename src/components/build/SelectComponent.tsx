import {
  CostAndRequirements,
  CostAndRequirementsList,
} from "@/models/CostAndRequirements/CostAndRequirements";
import React from "react";
import BorderedBox from "../ui/BorderedBox";
import ViewButton from "./ViewButton";
import { LevelledComponent } from "@/utils/getRequirementsBreakdown";
import { getComponentTypeTranslation } from "@/utils/getTranslation";
import ComponentType from "@/models/ComponentType";

type Props<T extends ComponentType> = {
  component: T;
  levels: CostAndRequirementsList<T>[T];
  existing: LevelledComponent[];
  onSelectComponent: (level: number, component: CostAndRequirements<T>) => void;
};

const SelectComponent = <T extends ComponentType>({
  component,
  levels,
  existing,
  onSelectComponent,
}: Props<T>) => {
  const maxLevel = Object.keys(levels).length;
  if (maxLevel === 0) {
    return <></>;
  }

  const currentLevel = existing.find((t) => t.type === component)?.level ?? 0;
  const nextLevel = levels[currentLevel + 1];

  return (
    <BorderedBox title={getComponentTypeTranslation(component)}>
      <div className="flex flex-col items-center">
        {nextLevel && (
          <ViewButton
            onClick={onSelectComponent.bind(null, currentLevel + 1, nextLevel)}
          />
        )}
      </div>
      <div className="flex flex-col items-end">
        <div>
          {currentLevel}/{maxLevel}
        </div>
      </div>
    </BorderedBox>
  );
};

export default SelectComponent;
