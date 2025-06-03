import { Ship } from "@prisma/client";
import React from "react";
import Button from "../ui/Button";

type Props = {
  ships: Ship[];
  locate: (x: number, y: number) => void;
};

const ShipList = ({ ships, locate }: Props) => {
  return (
    <div className="flex flex-col">
      {ships.map((s) => (
        <div key={s.id} className="flex flex-row gap-2 items-center">
          <Button onClick={() => locate(s.positionX, s.positionY)}>
            ship {s.id.substring(0, 5)} @ {s.positionX},{s.positionY} 🔎
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ShipList;
