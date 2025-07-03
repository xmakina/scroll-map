"use client";

import BorderedBox from "@/components/ui/BorderedBox";
import { OutpostWithComponents } from "@/models/OutpostWithComponents";
import React from "react";
import OutpostLink from "./OutpostLink";
import { usePlayerContext } from "@/context/PlayerContext";

type Props = {
  outpost: OutpostWithComponents;
};

const OutpostSummary = ({ outpost }: Props) => {
  const { playerId } = usePlayerContext();
  const owned = outpost.playerId === playerId;

  return (
    <BorderedBox title={outpost.label}>
      <div className="flex flex-col items-center">
        <OutpostLink owned={owned} id={outpost.id} />
      </div>
    </BorderedBox>
  );
};

export default OutpostSummary;
