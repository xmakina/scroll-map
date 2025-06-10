import { Activity } from "@prisma/client";
import React from "react";
import ShipActivityDetails from "./ShipActivityDetails";
import { claimActivity } from "@/app/map/actions";

type Props = {
  shipId: string;
  activity: Activity;
};

const ActivityDetails = ({ shipId, activity }: Props) => {
  const handleClaim = claimActivity.bind(null, shipId, activity.id);

  return (
    <div>
      <ShipActivityDetails
        activity={activity}
        onClaim={handleClaim}
      ></ShipActivityDetails>
    </div>
  );
};

export default ActivityDetails;
