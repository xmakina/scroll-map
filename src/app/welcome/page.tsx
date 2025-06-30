import ShipService from "@/services/ShipService";
import React from "react";
import { getPlayer } from "../queries";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import { placeShip } from "./actions";
import FriendCode from "./FriendCode";
import Title from "@/components/ui/Title";

const shipService = await ShipService.get();

const WelcomePage = async () => {
  const { id: playerId } = await getPlayer();
  const ships = await shipService.getShips(playerId);
  if (ships.length > 0) {
    return redirect("/dashboard");
  }

  const handlePlaceShip = placeShip.bind(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <Title>Welcome to The New Galaxy</Title>
      <div className="flex flex-col items-center md:flex-row justify-between gap-8">
        <FriendCode onSubmit={handlePlaceShip} />
        <div className="italic text-lg">OR</div>
        <div className="flex flex-col items-center gap-4">
          <div className="italic text-md">
            Start in your own part of the universe
          </div>
          <div>
            <Button onClick={handlePlaceShip}>Adventure!</Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
