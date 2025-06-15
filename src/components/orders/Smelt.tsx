"use client";

import { ActivityType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import Button from "../ui/Button";

type Props = {
  onClick: () => Promise<void> | void;
};

const Smelt = ({ onClick }: Props) => {
  const t = useTranslations("OrderButton");
  return (
    <div>
      <Button onClick={onClick}>{t(ActivityType.SMELT)}</Button>
    </div>
  );
};

export default Smelt;
