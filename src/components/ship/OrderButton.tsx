import React from "react";
import Scuttle from "../orders/Scuttle";
import { ActivityType } from "@prisma/client";
import Scavenge from "../orders/Scavenge";
import { NavigationLink } from "../ui/Navigation";

type Props = {
  order: ActivityType;
  onIssueOrder: () => Promise<void> | void;
  shipId: string;
};

const OrderButton = ({ order, onIssueOrder, shipId }: Props) => {
  switch (order) {
    case "DELIVER":
      return <></>; // Deliver is issued on the target station
    case "BUILD":
    case "SCUTTLE":
      return <Scuttle onClick={onIssueOrder} />;
    case "SCAVENGE":
      return <Scavenge onClick={onIssueOrder} />;
    case "MINE":
      return (
        <NavigationLink href={`/ship/${shipId}/mine`}>Mine</NavigationLink>
      ); // Mining is issued on the planet
  }
};

export default OrderButton;
