"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import React, { useState } from "react";
import { LatLngExpression, LatLngTuple, Map } from "leaflet";
import Waypoint from "@/models/waypoint/Waypoint";
import StarDetails from "./StarDetails";
import WaypointDetails from "./WaypointDetails";
import ShipManagement from "../ship/ShipManagement";
import { Ship } from "@prisma/client";
import StarMap from "./StarMap";

type Props = {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  onSelected?: (waypoint: Waypoint) => Promise<void> | void;
  ships?: Ship[];
  onCreateShip: (xy: { x: number; y: number }) => Promise<void>;
};

const defaults = {
  zoom: 3,
};

const GameMap = ({
  zoom = defaults.zoom,
  posix,
  ships = [],
  onCreateShip: createShip,
}: Props) => {
  const [details, setDetails] = useState<Waypoint>();
  const [map, setMap] = useState<Map>();

  function handleMapSelection(waypoint: Waypoint) {
    setDetails(waypoint);
  }

  async function handleCreateShip() {
    if (!details) {
      return;
    }

    createShip({ x: details.xPos, y: details.yPos });
  }

  function handleLocate(x: number, y: number) {
    map?.flyTo([y, x], 8);
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <ShipManagement
        ships={ships}
        selectedStar={details}
        createShip={handleCreateShip}
        locate={handleLocate}
      />
      <StarMap
        posix={posix}
        zoom={zoom}
        onSelected={handleMapSelection}
        selected={details}
        onReady={setMap}
      />
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
