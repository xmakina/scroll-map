import React from "react";
import Button from "../ui/Button";
import { ShipWithActivity } from "@/repositories/ShipRepository";
import ShipActivityDetails from "./ShipActivityDetails";

type Props = {
  ships: ShipWithActivity[];
  locate: (x: number, y: number) => void;
  onClaim: (shipId: string, activityId: string) => Promise<void>;
};

const ShipList = ({ ships, locate, onClaim }: Props) => {
  return (
    <div className="flex flex-col">
      {ships.map((s) => (
        <div key={s.id} className="flex flex-row gap-2 items-center">
          <Button onClick={() => locate(s.positionX, s.positionY)}>
            ship {s.id.substring(0, 5)} @ {s.positionX},{s.positionY} 🔎{" "}
            {s.cargo ? `carrying ${s.cargo}` : ""}
          </Button>
          {s.Worker.Activity && (
            <ShipActivityDetails
              activity={s.Worker.Activity}
              onClaim={onClaim.bind(null, s.id, s.Worker.Activity.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShipList;
