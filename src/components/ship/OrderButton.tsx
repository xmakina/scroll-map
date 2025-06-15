import React from "react";
import Scuttle from "../orders/Scuttle";
import { ActivityType } from "@prisma/client";
import Scavenge from "../orders/Scavenge";

type Props = {
  order: ActivityType;
  onIssueOrder: () => Promise<void> | void;
};

const OrderButton = ({ order, onIssueOrder }: Props) => {
  switch (order) {
    case "DELIVER":
      return <></>; // Deliver is issued on the target station
    case "BUILD":
    case "SCUTTLE":
      return <Scuttle onClick={onIssueOrder} />;
    case "SCAVENGE":
      return <Scavenge onClick={onIssueOrder} />;
    case "MINE":
      return <></>;
  }
};

export default OrderButton;
