import React from "react";
import OrderButton from "../ship/OrderButton";

type Props = {
  availableOrders: string[];
  onIssueOrder: (orderName: string) => Promise<void> | void;
};

const Orders = ({ availableOrders, onIssueOrder }: Props) => {
  return (
    <div>
      {availableOrders.map((order) => (
        <OrderButton
          key={order}
          order={order}
          onIssueOrder={onIssueOrder.bind(null, order)}
        />
      ))}
    </div>
  );
};

export default Orders;
