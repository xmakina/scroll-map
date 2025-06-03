"use client";

import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import MapStar from "./MapStar";
import Waypoint from "@/models/waypoint/Waypoint";
import { getWaypoints } from "@/utils/getWaypoints";
import { CRS, LatLngExpression, LatLngTuple, Map } from "leaflet";
import MapTravel from "./MapTravel";

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
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [map, setMap] = useState<Map | null>(null);

  const updateRequest = async () => {
    if (!map) {
      return;
    }

    const bounds = map.getBounds();

    const fetchedWaypoints = await getWaypoints({
      north: bounds.getNorth() + 5,
      south: bounds.getSouth() - 5,
      east: bounds.getEast() + 5,
      west: bounds.getWest() - 5,
    });

    setWaypoints(fetchedWaypoints);
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    updateRequest();
    map.on("moveend", updateRequest);
    onReady(map);
  }, [map]);
  return (
    <div>
      <div>
        {map && <MapTravel onTravel={(posix) => map.flyTo(posix, 5)} />}
      </div>
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
          {waypoints.map((w) => (
            <MapStar
              waypoint={w}
              key={`${w.id}${selected?.id}`}
              onClick={onSelected}
              selected={selected?.id === w.id}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default StarMap;
