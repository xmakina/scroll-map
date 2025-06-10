"use client";

import React from "react";
import OrderButton from "./OrderButton";

type Props = {
  orders: string[];
  onIssueOrder: (orderName: string) => Promise<void> | void;
};

const ShipOrders = ({ orders, onIssueOrder }: Props) => {
  return (
    <div>
      {orders.map((order) => (
        <OrderButton
          key={order}
          order={order}
          onIssueOrder={onIssueOrder}
        ></OrderButton>
      ))}
    </div>
  );
};

export default ShipOrders;
