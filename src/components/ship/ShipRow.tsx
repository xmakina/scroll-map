import { ShipWithActivity } from "@/models/ShipWithActivity";
import React, { ReactElement } from "react";
import ActivityDetails from "../activity/ActivityDetails";

type Props = {
  ship: ShipWithActivity;
  orders: ReactElement;
  onClaimActivity: (activity: string) => Promise<void> | void;
};

const ShipRow = ({ ship, orders, onClaimActivity }: Props) => {
  return (
    <div className="flex-col items-center gap-2 justify-center">
      <div>Ship: {ship.id}</div>

      {ship.Worker.Activity && (
        <ActivityDetails
          activity={ship.Worker.Activity}
          onClaim={onClaimActivity.bind(null, ship.Worker.Activity.id)}
        />
      )}

      {!ship.Worker.Activity && orders}
    </div>
  );
};

export default ShipRow;
