import React from "react";
import Scuttle from "../orders/Scuttle";
import { ActivityType } from "@prisma/client";
import Mine from "../orders/Mine";

type Props = {
  order: ActivityType;
  onIssueOrder: () => Promise<void> | void;
};

const OrderButton = ({ order, onIssueOrder }: Props) => {
  switch (order) {
    case "MINE":
      return <Mine onClick={onIssueOrder} data={{ available: [] }} />;
    case "DELIVER":
    case "BUILD":
    case "SCUTTLE":
      return <Scuttle onClick={onIssueOrder} />;
    case "SCAVENGE":
  }
};

export default OrderButton;
