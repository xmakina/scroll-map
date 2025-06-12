import React from "react";
import Button from "../ui/Button";
import { ActivityType } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  onClick: () => Promise<void> | void;
};

const Scavenge = ({ onClick }: Props) => {
  const t = useTranslations("OrderButton");
  return <Button onClick={onClick}>{t(ActivityType.SCAVENGE)}</Button>;
};

export default Scavenge;
