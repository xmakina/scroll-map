"use client";

import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import React, { useEffect } from "react";
import FriendCode from "./FriendCode";
import { useLayout } from "@/context/LayoutContext";

type Props = {
  onPlaceShip: (friendCode?: string) => Promise<void>;
};

const WelcomeScreen = ({ onPlaceShip }: Props) => {
  const layoutSettings = useLayout();

  const handlePlaceShip = async (friendCode?: string) => {
    await onPlaceShip(friendCode);
    layoutSettings.changeNavigation(true);
  };

  useEffect(() => {
    if (layoutSettings.layout.showNavigation) {
      layoutSettings.changeNavigation(false);
    }
  }, []);

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

export default WelcomeScreen;
