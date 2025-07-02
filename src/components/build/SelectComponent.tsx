import {
  CostAndRequirements,
  CostAndRequirementsList,
} from "@/models/CostAndRequirements/CostAndRequirements";
import React from "react";
import BorderedBox from "../ui/BorderedBox";
import { useTranslations } from "next-intl";
import ViewButton from "./ViewButton";
import { LevelledComponent } from "@/utils/getRequirementsBreakdown";

type Props<T extends string> = {
  component: T;
  levels: CostAndRequirementsList<T>[T];
  existing: LevelledComponent[];
  onSelectComponent: (level: number, component: CostAndRequirements<T>) => void;
};

const SelectComponent = <T extends string>({
  component,
  levels,
  existing,
  onSelectComponent,
}: Props<T>) => {
  const componentTranslations = useTranslations("ComponentDetails");
  const maxLevel = Object.keys(levels).length;
  if (maxLevel === 0) {
    return <></>;
  }

  const currentLevel = existing.find((t) => t.type === component)?.level ?? 0;
  const nextLevel = levels[currentLevel + 1];

  return (
    <BorderedBox title={componentTranslations(`${component}`)}>
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
