import React from "react";

type Props = {
  orders: string[];
};

const ShipOrders = ({ orders }: Props) => {
  return (
    <div>
      {orders.map((order) => (
        <div key={order}>{order}</div>
      ))}
    </div>
  );
};

export default ShipOrders;
