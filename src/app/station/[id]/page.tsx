import React from "react";
import { getOrders, getShips, getStation } from "./queries";
import { StationData } from "@/models/StationData";
import TugManager from "./DeployTug";
import { deployTug } from "./actions";
import ShipRow from "@/components/ship/ShipRow";
import { NavigationLink } from "@/components/ui/Navigation";
import ShipOrders from "@/components/ship/ShipOrders";

type Props = { params: Promise<{ id: string }> };
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const station = await getStation(id);
  const ships = await getShips(id);
  const data: StationData = (station.data as StationData) || {};

  const handleDeployTug = deployTug.bind(null, id);

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
          const orders = await getOrders(ship.id);
          const orderList = <ShipOrders orders={orders} />;

          return <ShipRow orders={orderList} ship={ship} />;
        })}
      </div>
    </div>
  );
};

export default Page;
