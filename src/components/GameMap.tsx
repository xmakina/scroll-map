"use client";

import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import React, { useEffect, useState } from "react";
import { CRS, LatLngExpression, LatLngTuple, Map } from "leaflet";
import { useDebouncedCallback } from "use-debounce";
import Waypoint from "@/models/waypoint/Waypoint";
import MapStar from "./MapStar";

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  updateStars: (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => Promise<Waypoint[]>;
}

const defaults = {
  zoom: 7,
};

const GameMap = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix, updateStars } = Map;
  const [map, setMap] = useState<Map | null>(null);
  const [stars, setStars] = useState<Waypoint[]>([]);
  const [details, setDetails] = useState<Waypoint | null>(null);

  const updateRequest = useDebouncedCallback(async () => {
    if (!map) {
      return;
    }

    const bounds = map.getBounds();

    const newStars = await updateStars({
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
    });

    setStars(newStars);
  }, 100);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on("move", updateRequest);
  });

  return (
    <>
      <MapContainer
        center={posix}
        zoom={zoom}
        maxZoom={7}
        minZoom={5}
        scrollWheelZoom={false}
        ref={setMap}
        style={{ background: "#000000" }}
        className="h-full w-full"
        crs={CRS.Simple}
        whenReady={updateRequest}
      >
        {stars.map((w) => (
          <MapStar waypoint={w} key={w.seed} onClick={setDetails} />
        ))}
      </MapContainer>
      <p>{JSON.stringify(details)}</p>
    </>
  );
};

export default GameMap;
