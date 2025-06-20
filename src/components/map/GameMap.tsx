"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import React, { useEffect, useState } from "react";
import { LatLngExpression, LatLngTuple, Map } from "leaflet";
import Waypoint from "@/models/waypoint/Waypoint";
import StarMap from "./StarMap";
import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import TutorialStation from "@/app/map/TutorialStation";
import StationList from "../station/StationList";
import { Station } from "@prisma/client";

type Props = {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  onSelected?: (waypoint: Waypoint) => Promise<void> | void;
  stations: StationWithComponentsAndWorker[];
  allStations: Station[];
  onDeployStation: (waypointId: string) => Promise<void> | void;
};

const defaults = {
  zoom: 3,
};

const GameMap = ({
  zoom: defaultZoom = defaults.zoom,
  posix: defaultPosix,
  stations,
  allStations,
  onDeployStation,
}: Props) => {
  const [posix, setPosix] = useState(defaultPosix);
  const [zoom, setZoom] = useState(defaultZoom);
  const [details, setDetails] = useState<Waypoint>();
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    setPosix(posix);
  }, [posix]);

  useEffect(() => {
    map?.flyTo(posix, zoom);
  }, [posix]);

  function handleMapSelection(waypoint: Waypoint) {
    setDetails(waypoint);
  }

  function zoomToDetails() {
    if (!details) {
      return;
    }

    setZoom(8);
    setPosix([details?.yPos, details?.xPos]);
  }

  async function handleDeployStation() {
    if (!details) {
      return;
    }

    return await onDeployStation(details.id);
  }

  const handleZoomToStation = (stationId: string) => {
    const station = stations.find((s) => s.id === stationId);
    if (!station) {
      throw Error("Station not found");
    }

    const waypoint = new Waypoint(station?.positionX, station?.positionY);
    setDetails(waypoint);
    setZoom(8);
    setPosix([station.positionY, station.positionX]);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse lg:mt-4 gap-4 justify-between w-full">
      <div className="flex flex-col grow w-full justify-center items-center">
        <StationList stations={stations} onZoom={handleZoomToStation} />
        {stations.length === 0 && (
          <TutorialStation
            waypoint={details}
            onZoom={zoomToDetails}
            onSelect={handleDeployStation}
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        <StarMap
          posix={posix}
          zoom={zoom}
          onSelected={handleMapSelection}
          selected={details}
          onReady={setMap}
          stations={allStations}
        />
      </div>
    </div>
  );
};

export default GameMap;
