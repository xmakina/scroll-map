import React from "react";
import Scuttle from "../orders/Scuttle";

type Props = {
  order: string;
  onIssueOrder: (orderName: string) => Promise<void> | void;
};

const OrderButton = ({ order, onIssueOrder }: Props) => {
  if (order === "scuttle") {
    return <Scuttle onClick={onIssueOrder.bind(null, "scuttle")} />;
  }
};

export default OrderButton;
