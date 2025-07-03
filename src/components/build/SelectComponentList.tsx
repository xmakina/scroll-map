import {
  CostAndRequirements,
  CostAndRequirementsList,
} from "@/models/CostAndRequirements/CostAndRequirements";
import getRequirementsBreakdown, {
  LevelledComponent,
} from "@/utils/getRequirementsBreakdown";
import React from "react";
import SelectComponent from "./SelectComponent";
import ComponentType from "@/models/ComponentType";

type Props<T extends ComponentType> = {
  components: T[];
  catalogue: CostAndRequirementsList<T>;
  existing: LevelledComponent[];
  onSelectComponent: (
    component: T,
    level: number,
    costAndRequirements: CostAndRequirements<T>
  ) => void;
  showAll?: boolean;
};

const BuildComponentList = <T extends ComponentType>({
  components,
  catalogue,
  existing,
  onSelectComponent,
  showAll = false,
}: Props<T>) => {
  return (
    <div className="flex flex-row flex-wrap justify-evenly gap-2 md:justify-between">
      {components.map((c) => {
        const levels = catalogue[c];
        const currentLevel = existing.find((t) => t.type === c)?.level ?? 0;
        const nextLevel = currentLevel + 1;

        const target = levels[nextLevel];
        const metRequirements =
          target &&
          getRequirementsBreakdown(target.requirements, existing).every(
            (b) => b.level >= b.required
          );

        if (!showAll && !metRequirements) {
          return;
        }

        return (
          <SelectComponent
            key={c}
            component={c}
            levels={levels}
            existing={existing}
            onSelectComponent={onSelectComponent.bind(null, c)}
          />
        );
      })}
    </div>
  );
};

export default BuildComponentList;
