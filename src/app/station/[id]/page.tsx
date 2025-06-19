import React from "react";
import {
  getShipOrders,
  getShips,
  getStation,
  getStationOrders,
} from "./queries";
import {
  claimActivityForShip,
  claimActivityForStation,
  issueMultipleShipsOrder,
  issueShipOrder,
  issueStationOrder,
} from "./actions";
import ShipRow from "@/components/ship/ShipRow";
import { NavigationLink } from "@/components/ui/Navigation";
import Orders from "@/components/orders/Orders";
import ActivityDetails from "@/components/activity/ActivityDetails";
import CargoHoldSummary from "@/components/cargoHold/CargoHoldSummary";
import StationComponents from "@/components/station/StationComponents";
import { StationContextProvider } from "@/context/StationContext";
import LocalVolume from "@/components/station/LocalVolume";

type Props = { params: Promise<{ id: string }> };
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const station = await getStation(id);
  const ships = await getShips(id);

  const handleOrder = issueShipOrder.bind(null);
  const handleMultiShipOrder = issueMultipleShipsOrder.bind(null);
  const handleStationOrder = issueStationOrder.bind(null, station.id);

  const availableOrders = await getStationOrders(station.id);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row justify-between items-center w-[100vw]">
        <div>
          <NavigationLink href="/map">Back</NavigationLink>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        <div className="flex flex-col border border-white gap-0 rounded-lg">
          <div className="flex flex-col gap-4 items-center border-b border-white  p-2">
            <div className="italic">Station Details</div>
            <div className="w-full text-center">Station {station.label}</div>
            <div>
              <NavigationLink href={`./${station.id}/build`}>
                Build
              </NavigationLink>
            </div>
            <div>
              <StationComponents components={station.Components} />
            </div>
            <div>
              <CargoHoldSummary cargoHold={station.CargoHold} />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center border-b border-white p-2">
            <div>Station Activities</div>
            <div className="flex flex-row">
              {station.ActivityWorker.Activity && (
                <ActivityDetails
                  activity={station.ActivityWorker.Activity}
                  onClaim={claimActivityForStation.bind(null, station.id)}
                />
              )}
              {!station.ActivityWorker.Activity && (
                <StationContextProvider station={station}>
                  <Orders
                    availableOrders={availableOrders}
                    onIssueOrder={handleStationOrder}
                  />
                </StationContextProvider>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <div>Ships</div>
            <div className="flex flex-col justify-center gap-2">
              {ships.length === 0 && <div className="italic">Empty</div>}
              {ships.map(async (ship) => {
                const availableOrders = await getShipOrders(ship.id);
                const onIssueOrder = handleOrder.bind(null, ship.id);
                const handleClaimActivity = claimActivityForShip.bind(
                  null,
                  ship.id
                );

                const orders = (
                  <Orders
                    availableOrders={availableOrders}
                    onIssueOrder={onIssueOrder}
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
        <div className="flex flex-col items-center border border-white rounded-3xl p-4">
          <LocalVolume
            ships={ships}
            x={station.positionX}
            y={station.positionY}
            onIssueOrder={handleMultiShipOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
