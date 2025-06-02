"use client";

import React, { useState } from "react";
import Button from "./ui/Button";
import { LatLngExpression } from "leaflet";

type Props = {
  onTravel: (posix: LatLngExpression) => void;
};

const MapTravel = ({ onTravel }: Props) => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const parseAndSubmitTravel = () => {
    const xNum = parseInt(x);
    const yNum = parseInt(y);

    if (xNum && yNum) {
      return onTravel([yNum, xNum]);
    }
  };

  return (
    <div className="flex flex-row gap-4 justify-center items-center">
      <div>
        <input
          type="number"
          className="text-black"
          onChange={(e) => setX(e.target.value)}
          value={x}
        />
      </div>
      <div>
        <input
          type="number"
          className="text-black"
          onChange={(e) => setY(e.target.value)}
          value={y}
        />
      </div>
      <Button onClick={parseAndSubmitTravel}>GO</Button>
    </div>
  );
};

export default MapTravel;
