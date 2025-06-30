import { ShipWithActivityAndCargoHold } from "@/models/ShipWithActivity";
import React, { ReactElement } from "react";
import ActivityDetails from "../activity/ActivityDetails";
import BorderedBox from "../ui/BorderedBox";

type Props = {
  ship: ShipWithActivityAndCargoHold;
  orders: ReactElement;
  onClaimActivity: (activity: string) => Promise<void> | void;
};

const ShipRow = ({ ship, orders, onClaimActivity }: Props) => {
  return (
    <BorderedBox title={ship.label}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-center">
          {ship.ActivityWorker.Activity && (
            <ActivityDetails
              activity={ship.ActivityWorker.Activity}
              onClaim={onClaimActivity.bind(
                null,
                ship.ActivityWorker.Activity.id
              )}
            />
          )}
          {!ship.ActivityWorker.Activity && orders}
        </div>
      </div>
    </BorderedBox>
  );
};

export default ShipRow;
