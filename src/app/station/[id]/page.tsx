import React from "react";
import { getOrders, getShips, getStation } from "./queries";
import { StationData } from "@/models/StationData";
import TugManager from "./DeployTug";
import { deployTug, issueOrder } from "./actions";
import ShipRow from "@/components/ship/ShipRow";
import { NavigationLink } from "@/components/ui/Navigation";
import Orders from "@/components/orders/Orders";

type Props = { params: Promise<{ id: string }> };
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const station = await getStation(id);
  const ships = await getShips(id);
  const data: StationData = (station.data as StationData) || {};

  const handleDeployTug = deployTug.bind(null, id);
  const handleOrder = issueOrder.bind(null);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row justify-between items-center w-[100vw]">
        <div>
          <NavigationLink href="/map">Back</NavigationLink>
        </div>
        <div className="w-full text-center">Station {station.id}</div>
      </div>
      <div className="flex flex-row justify-center">
        {!data.tugDeployed && <TugManager onDeployTug={handleDeployTug} />}
        {ships.map(async (ship) => {
          const onIssueOrder = handleOrder.bind(null, ship.id);
          const orders = (
            <Orders
              availableOrders={await getOrders(ship.id)}
              onIssueOrder={onIssueOrder}
            />
          );
          return <ShipRow orders={orders} ship={ship} />;
        })}
      </div>
    </div>
  );
};

export default Page;
