import React, { ReactNode } from "react";
import Scuttle from "./Scuttle";
import { ActivityType } from "@prisma/client";
import Scavenge from "./Scavenge";
import Smelt from "./Smelt";
import Deliver from "./Deliver";

type Props = {
  order: ActivityType;
  onIssueOrder: () => Promise<void> | void;
};

const orderButtons: {
  [key in ActivityType]: (
    onIssueOrder: (data?: object) => Promise<void> | void
  ) => ReactNode | ReactNode[];
} = {
  MINE: () => <></>,
  DELIVER: (onIssueOrder) => <Deliver onClick={onIssueOrder} />, // Deliver is issued on the target station,
  BUILD: () => <></>,
  BuildShip: () => <></>,
  SCUTTLE: (onIssueOrder) => <Scuttle onClick={onIssueOrder} />,
  SCAVENGE: (onIssueOrder) => <Scavenge onClick={onIssueOrder} />,
  SMELT: (onIssueOrder) => <Smelt onClick={onIssueOrder} />,
};

const OrderButton = ({ order, onIssueOrder }: Props) => {
  return orderButtons[order](onIssueOrder);
};

export default OrderButton;
