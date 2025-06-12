"use client";

import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import MapStar from "./MapStar";
import Waypoint from "@/models/waypoint/Waypoint";
import { getWaypoints } from "@/utils/getWaypoints";
import { CRS, LatLngExpression, LatLngTuple, Map } from "leaflet";
import MapFilters, { MapFilter } from "./MapFilters";
import StarDetails from "./StarDetails";

type Props = {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  onSelected?: (waypoint: Waypoint) => Promise<void> | void;
  selected?: Waypoint;
  onReady?: (map: Map) => void;
};

const StarMap = ({
  posix,
  zoom,
  selected,
  onSelected = () => {},
  onReady = () => {},
}: Props) => {
  const [filters, setFilters] = useState<MapFilter>({ planets: true });
  const [allWaypoints, setAllWaypoints] = useState<Waypoint[]>([]);
  const [filteredWaypoints, setFilteredWaypoints] = useState<Waypoint[]>([]);
  const [map, setMap] = useState<Map | null>(null);

  const updateRequest = async () => {
    if (!map) {
      return;
    }

    const bounds = map.getBounds();

    const waypoints = await getWaypoints({
      north: bounds.getNorth() + 5,
      south: bounds.getSouth() - 5,
      east: bounds.getEast() + 5,
      west: bounds.getWest() - 5,
    });

    setAllWaypoints(waypoints);
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    updateRequest();
    map.on("moveend", updateRequest);
    onReady(map);
  }, [map]);

  const handleFilterChanged = (newFilters: MapFilter) => {
    setFilters({ ...newFilters });
  };

  useEffect(() => {
    const filteredWaypoints = allWaypoints.filter((w) =>
      filters.planets
        ? w.stars.filter((s) => s.planets.length > 0).length > 0
        : true
    );

    setFilteredWaypoints(filteredWaypoints);
  }, [filters, allWaypoints]);

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="mx-auto w-full h-[60vh]">
        <MapContainer
          center={posix}
          zoom={zoom}
          maxZoom={12}
          minZoom={3}
          ref={setMap}
          style={{ background: "#000000" }}
          className="h-full w-full"
          crs={CRS.Simple}
        >
          {filteredWaypoints.map((w) => (
            <MapStar
              waypoint={w}
              key={`${w.id}${selected?.id}`}
              onClick={onSelected}
              selected={selected?.id === w.id}
            />
          ))}
        </MapContainer>
      </div>
      <div>
        <MapFilters onFilterChanged={handleFilterChanged} />
      </div>
      <div>
        {selected?.stars.map((s) => (
          <StarDetails key={s.id} star={s} />
        ))}
      </div>
    </div>
  );
};

export default StarMap;
