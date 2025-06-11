import React from "react";
import Button from "../ui/Button";
import { CargoType } from "@prisma/client";

export type MiningOrderData = {
  available: CargoType[];
};

type Props = {
  onClick: () => Promise<void> | void;
  data: MiningOrderData;
};

const Mine = ({ onClick }: Props) => {
  return <Button onClick={onClick}>Mine</Button>;
};

export default Mine;
