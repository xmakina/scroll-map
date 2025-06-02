"use client";

import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import React, { useEffect, useState } from "react";
import { CRS, LatLngExpression, LatLngTuple, Map } from "leaflet";
import Waypoint from "@/models/waypoint/Waypoint";
import MapStar from "./MapStar";
import { roundTo } from "@/utils/roundTo";
import range from "@/utils/range";

export const getStars = async ({
  north,
  south,
  east,
  west,
}: {
  north: number;
  south: number;
  east: number;
  west: number;
}): Promise<Waypoint[]> => {
  const rNorth = roundTo(north, 1);
  const rSouth = roundTo(south, 1);
  const rEast = roundTo(east, 1);
  const rWest = roundTo(west, 1);

  const yList = Array.from(range(rSouth, rNorth));
  const xList = Array.from(range(rWest, rEast));

  return new Promise((resolve) => {
    const result = yList
      .flatMap((y) => xList.map((x) => new Waypoint(x, y)))
      .filter((p) => p.exists)
      .map((w) => w);

    resolve(result);
  });
};

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 3,
};

const GameMap = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;
  const [map, setMap] = useState<Map | null>(null);
  const [stars, setStars] = useState<Waypoint[]>([]);
  const [details, setDetails] = useState<Waypoint | null>(null);

  useEffect(() => {
    if (map) {
      updateRequest();
    }
  }, [map]);

  const updateRequest = async () => {
    if (!map) {
      return;
    }

    const bounds = map.getBounds();

    const newStars = await getStars({
      north: bounds.getNorth() + 5,
      south: bounds.getSouth() - 5,
      east: bounds.getEast() + 5,
      west: bounds.getWest() - 5,
    });

    setStars(newStars);
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on("moveend", updateRequest);
  });

  return (
    <>
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
        {stars.map((w) => (
          <MapStar waypoint={w} key={w.seed} onClick={setDetails} />
        ))}
      </MapContainer>
      <p>{JSON.stringify(details)}</p>
    </>
  );
};

export default GameMap;
