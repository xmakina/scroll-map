"use client";

import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import React, { useEffect, useState } from "react";
import { CRS, LatLngExpression, LatLngTuple, Map } from "leaflet";
import Waypoint from "@/models/waypoint/Waypoint";
import MapStar from "./MapStar";
import StarDetails from "./StarDetails";
import MapTravel from "./MapTravel";
import { getStars } from "../utils/getStars";
import WaypointDetails from "./WaypointDetails";

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

    updateRequest();
    map.on("moveend", updateRequest);
  }, [map]);

  return (
    <div className="flex flex-col w-full gap-2">
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
          {stars.map((w) => (
            <MapStar
              waypoint={w}
              key={w.seed}
              onClick={setDetails}
              selected={details?.seed === w.seed}
            />
          ))}
        </MapContainer>
      </div>
      <div className="flex flex-col items-center">
        {details && <WaypointDetails waypoint={details} />}
        {details?.stars.map((s, i) => (
          <StarDetails key={i} star={s} />
        ))}
      </div>
    </div>
  );
};

export default GameMap;
