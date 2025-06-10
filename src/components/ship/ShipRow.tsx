import { ShipWithActivity } from "@/repositories/ShipRepository";
import React, { ReactElement } from "react";
import ShipActivityDetails from "../activity/ShipActivityDetails";

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
        <ShipActivityDetails
          activity={ship.Worker.Activity}
          onClaim={onClaimActivity.bind(null, ship.Worker.Activity.id)}
        />
      )}

      {!ship.Worker.Activity && orders}
    </div>
  );
};

export default ShipRow;
