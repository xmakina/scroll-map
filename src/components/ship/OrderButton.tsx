import React from "react";
import Scuttle from "../orders/Scuttle";
import { ActivityType } from "@prisma/client";

type Props = {
  order: ActivityType;
  onIssueOrder: () => Promise<void> | void;
};

const OrderButton = ({ order, onIssueOrder }: Props) => {
  if (order === "SCUTTLE") {
    return <Scuttle onClick={onIssueOrder} />;
  }
};

export default OrderButton;
