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
import { getStars } from "./getStars";

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
    <div>
      <div>
        {map && <MapTravel onTravel={(posix) => map.flyTo(posix, 5)} />}
      </div>
      <div className="mx-auto my-5 w-[98vw] h-[480px]">
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
      </div>
      <div>{details && <StarDetails star={details} />}</div>
    </div>
  );
};

export default GameMap;
