"use client";

import { Activity } from "@prisma/client";
import React, { useState } from "react";
import Button from "../ui/Button";
import Countdown from "react-countdown";

type Props = {
  activity: Activity;
  onClaim: () => Promise<void> | void;
};

const ShipActivityDetails = ({ activity, onClaim }: Props) => {
  const [done, setDone] = useState(activity.endTime < new Date(Date.now()));

  const updateDone = () => setDone(activity.endTime < new Date(Date.now()));

  return (
    <div className="flex flex-row gap-2 items-center">
      <div>{activity.type}</div>
      {done && (
        <div>
          <Button onClick={onClaim}>Claim</Button>
        </div>
      )}
      {!done && (
        <div className="flex flex-row gap-2">
          <div>Ready in</div>
          <Countdown date={activity.endTime} onComplete={updateDone} />
        </div>
      )}
    </div>
  );
};

export default ShipActivityDetails;
