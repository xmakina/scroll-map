import { ShipWithActivity } from "@/repositories/ShipRepository";
import React, { ReactElement } from "react";

type Props = {
  ship: ShipWithActivity;
  orders: ReactElement;
};

const ShipRow = ({ ship, orders }: Props) => {
  return (
    <div className="flex-col items-center gap-2 justify-center">
      <div>Ship: {ship.id}</div>
      {orders}
    </div>
  );
};

export default ShipRow;
