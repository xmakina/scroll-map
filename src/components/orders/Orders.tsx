import React from "react";
import OrderButton from "../ship/OrderButton";
import { ActivityType } from "@prisma/client";

type Props = {
  availableOrders: ActivityType[];
  onIssueOrder: (orderName: ActivityType) => Promise<void> | void;
};

const Orders = ({ availableOrders, onIssueOrder }: Props) => {
  return (
    <div>
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
