import StarDetails from "@/components/map/StarDetails";
import Button from "@/components/ui/Button";
import Waypoint from "@/models/waypoint/Waypoint";
import React, { useEffect, useState } from "react";

type Props = {
  waypoint?: Waypoint;
  onZoom: () => void;
  onSelect: () => void;
};

const TutorialStation = ({ waypoint, onZoom, onSelect }: Props) => {
  const [hasZoomed, setHasZoomed] = useState(false);
  const [hasPlanets, setHasPlanets] = useState(false);

  useEffect(() => {
    setHasZoomed(false);
    if (waypoint?.stars.some((s) => s.planets.length > 0)) {
      setHasPlanets(true);
    } else {
      setHasPlanets(false);
    }
  }, [waypoint]);

  const handleZoom = () => {
    onZoom();
    setHasZoomed(true);
  };

  return (
    <div>
      {!hasZoomed && (
        <FindAndZoomToStar
          waypoint={waypoint}
          hasPlanets={hasPlanets}
          onDone={handleZoom}
        />
      )}
      {hasZoomed && waypoint && (
        <DeployStation waypoint={waypoint} onSelect={onSelect} />
      )}
    </div>
  );
};

const DeployStation = ({
  waypoint,
  onSelect,
}: {
  waypoint: Waypoint;
  onSelect: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>Here you can see the planets around your star</div>
      {waypoint.stars.map((s) => (
        <StarDetails key={s.id} star={s} />
      ))}
      <div className="flex flex-col gap-2 justify-center items-center">
        <div>You can choose a different star, or</div>
        <div>
          <Button onClick={onSelect}>Deploy your Home Station</Button>
        </div>
      </div>
    </div>
  );
};

const FindAndZoomToStar = ({
  waypoint,
  hasPlanets,
  onDone,
}: {
  waypoint?: Waypoint;
  hasPlanets: boolean;
  onDone: () => void;
}) => {
  return (
    <div>
      {!waypoint && <div>Select a star on the map</div>}
      {waypoint && (
        <div>
          {!hasPlanets && <div>Select a star with at least one planet</div>}
          {hasPlanets && (
            <div>
              <Button onClick={onDone}>Zoom in for a closer look</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorialStation;
