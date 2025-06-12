import React from "react";
import OrderButton from "../ship/OrderButton";
import { ActivityType } from "@prisma/client";

type Props = {
  availableOrders: ActivityType[];
  onIssueOrder: (orderName: ActivityType) => Promise<void> | void;
  shipId: string;
};

const Orders = ({ availableOrders, onIssueOrder, shipId }: Props) => {
  return (
    <div className="flex flex-row justify-between gap-2">
      {availableOrders.map((order) => {
        const handleOrder = onIssueOrder.bind(null, order);
        return (
          <OrderButton
            key={order}
            onIssueOrder={handleOrder}
            order={order}
            shipId={shipId}
          />
        );
      })}
    </div>
  );
};

export default Orders;
