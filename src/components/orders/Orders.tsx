import React from "react";
import OrderButton from "./OrderButton";
import { ActivityType } from "@prisma/client";

type Props = {
  availableOrders: ActivityType[];
  onIssueOrder: (orderName: ActivityType) => Promise<void> | void;
};

const Orders = ({ availableOrders, onIssueOrder }: Props) => {
  return (
    <div className="flex flex-row gap-2 justify-around">
      {availableOrders.map((order) => {
        const handleOrder = onIssueOrder.bind(null, order);
        return (
          <OrderButton key={order} onIssueOrder={handleOrder} order={order} />
        );
      })}
    </div>
  );
};

export default Orders;
