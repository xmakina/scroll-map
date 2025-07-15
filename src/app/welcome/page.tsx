import ShipService from "@/services/ShipService";
import React from "react";
import { getPlayer } from "../queries";
import { redirect } from "next/navigation";
import { placeShip } from "./actions";
import WelcomeScreen from "./WelcomeScreen";

const shipService = await ShipService.get();

const WelcomePage = async () => {
  const { id: playerId } = await getPlayer();
  const ships = await shipService.getShips(playerId);
  if (ships.length > 0) {
    return redirect("/dashboard");
  }

  const handlePlaceShip = placeShip.bind(null);

  return <WelcomeScreen onPlaceShip={handlePlaceShip} />;
};

export default WelcomePage;
