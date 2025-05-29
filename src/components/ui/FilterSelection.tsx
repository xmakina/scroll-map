"use client";

import React, { ReactNode } from "react";
import Button from "./Button";

export type NamedFilter<T> = {
  name: string;
  predicate: (i: T) => boolean;
  active?: boolean;
};

type Props<T> = {
  filters: NamedFilter<T>[];
  activeFilters: NamedFilter<T>[];
  onFilterApplied: (filter: NamedFilter<T>) => void;
  onFilterCleared: (filter: NamedFilter<T>) => void;
};

const FilterSelection = <T,>({
  filters,
  activeFilters,
  onFilterApplied,
  onFilterCleared,
}: Props<T>) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-2">
        {filters.map((f) => (
          <FilterButton
            key={f.name}
            isActive={activeFilters.includes(f)}
            onApply={() => onFilterApplied(f)}
            onClear={() => onFilterCleared(f)}
          >
            {f.name}
          </FilterButton>
        ))}
      </div>
    </div>
  );
};

type FilterButtonProps = {
  isActive: boolean;
  onApply: () => void;
  onClear: () => void;
  children: ReactNode;
};

const FilterButton = ({
  isActive,
  onApply,
  onClear,
  children,
}: FilterButtonProps) => {
  if (isActive) {
    return (
      <Button noHover active small onClick={onClear}>
        {children}
      </Button>
    );
  }

  return (
    <Button noHover small onClick={onApply}>
      {children}
    </Button>
  );
};

export default FilterSelection;
