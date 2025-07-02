import BorderedBox from "@/components/ui/BorderedBox";
import { OutpostWithComponents } from "@/models/OutpostWithComponents";
import React from "react";
import OutpostLink from "./OutpostLink";

type Props = {
  outpost: OutpostWithComponents;
};

const OutpostSummary = ({ outpost }: Props) => {
  return (
    <BorderedBox title={outpost.label}>
      <div>
        <OutpostLink ownerId={outpost.playerId} id={outpost.id} />
      </div>
    </BorderedBox>
  );
};

export default OutpostSummary;
