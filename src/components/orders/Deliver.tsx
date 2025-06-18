"use client";

import React from "react";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import { ActivityType } from "@prisma/client";

type Props = {
  onClick: () => Promise<void> | void;
};

export default ({ onClick }: Props) => {
  const t = useTranslations("OrderButton");

  return (
    <div>
      <Button onClick={onClick}>{t(ActivityType.DELIVER)}</Button>
    </div>
  );
};
