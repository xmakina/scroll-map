"use client";

import React, { useEffect, useState } from "react";

type Props = {
  onFilterChanged: (filters: MapFilter) => void;
};

export type MapFilter = {
  planets: boolean;
};

const MapFilters = ({ onFilterChanged }: Props) => {
  const [filters, setFilters] = useState<MapFilter>({ planets: false });
  const [withPlanets, setWithPlanets] = useState(false);

  useEffect(() => {
    filters.planets = withPlanets;
    setFilters(filters);

    onFilterChanged(filters);
  }, [withPlanets]);

  return (
    <div className="flex flex-row gap-4 justify-center">
      <div className="flex flex-row gap-2">
        <div>With Planets</div>
        <div>
          <input
            type="checkbox"
            checked={withPlanets}
            onChange={(e) => setWithPlanets(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
