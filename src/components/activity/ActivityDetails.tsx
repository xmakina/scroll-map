"use client";

import { Activity } from "@prisma/client";
import React, { useState } from "react";
import Button from "../ui/Button";
import Countdown from "react-countdown";
import { useTranslations } from "next-intl";
import clsx from "clsx";

type Props = {
  activity: Activity;
  onClaim: (activityId: string) => Promise<void> | void;
};

const padded = (value: number) => value.toString().padStart(2, "0");

type TimeDeltaObject = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTime = ({ days, hours, minutes, seconds }: TimeDeltaObject) => {
  if (days) {
    return `${days}d:${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
  }
  if (hours) {
    return `${hours}:${padded(minutes)}:${padded(seconds)}`;
  }
  if (minutes) {
    return `${minutes}:${padded(seconds)}`;
  }
  return seconds.toString();
};

const renderer = (time: TimeDeltaObject) => {
  return <span>{getTime(time)}</span>;
};

const ActivityDetails = ({ activity, onClaim }: Props) => {
  const t = useTranslations("ActivityDetails");
  const handleClaim = onClaim.bind(null, activity.id);
  const [done, setDone] = useState(activity.endTime < new Date(Date.now()));
  const updateDone = () => setDone(true);

  return (
    <div
      className={clsx("flex flex-col gap-2 items-center p-2 rounded-xl", {
        "bg-amber-900": activity.type === "MINE",
        "bg-red-900": activity.type === "SCUTTLE",
      })}
    >
      <div>{t(activity.type)}</div>
      {done && (
        <div>
          <Button onClick={handleClaim}>Claim</Button>
        </div>
      )}
      {!done && (
        <div className="flex flex-col items-center w-full">
          <Countdown
            date={activity.endTime}
            renderer={renderer}
            onComplete={updateDone}
          />
        </div>
      )}
    </div>
  );
};

export default ActivityDetails;
