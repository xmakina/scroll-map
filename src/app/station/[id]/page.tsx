import React from "react";
import { getOrders, getShips, getStation } from "./queries";
import { StationData } from "@/models/StationData";
import TugManager from "./DeployTug";
import {
  claimActivityForShip,
  claimActivityForStation,
  deployTug,
  issueOrder,
} from "./actions";
import ShipRow from "@/components/ship/ShipRow";
import { NavigationLink } from "@/components/ui/Navigation";
import Orders from "@/components/orders/Orders";
import ActivityDetails from "@/components/activity/ActivityDetails";
import CargoHoldSummary from "@/components/cargoHold/CargoHoldSummary";
import StationComponents from "@/components/station/StationComponents";

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
      </div>
      <div className="flex flex-col gap-4 items-center border border-white rounded-lg p-2">
        <div className="italic">Station Details</div>
        <div className="w-full text-center">Station {station.id}</div>
        <div>
          <NavigationLink href={`./${station.id}/build`}>Build</NavigationLink>
        </div>
        <div>
          <StationComponents components={station.Components} />
        </div>
        <div>
          <CargoHoldSummary cargoHold={station.CargoHold} />
        </div>
      </div>

      <div>
        {station.ActivityWorker.Activity && (
          <ActivityDetails
            activity={station.ActivityWorker.Activity}
            onClaim={claimActivityForStation.bind(null, station.id)}
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-2">
        <div>Ships</div>
        <div className="flex flex-row justify-center">
          {!data.tugDeployed && <TugManager onDeployTug={handleDeployTug} />}
          {ships.map(async (ship) => {
            const availableOrders = await getOrders(ship.id);
            const onIssueOrder = handleOrder.bind(null, ship.id);
            const handleClaimActivity = claimActivityForShip.bind(
              null,
              ship.id
            );

            const orders = (
              <Orders
                availableOrders={availableOrders}
                onIssueOrder={onIssueOrder}
                shipId={ship.id}
              />
            );

            return (
              <ShipRow
                orders={orders}
                ship={ship}
                onClaimActivity={handleClaimActivity}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
