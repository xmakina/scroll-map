"use client";

import { NavigationLink } from "@/components/ui/Navigation";
import { usePlayerContext } from "@/context/PlayerContext";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  id: string;
  ownerId: string;
};

const OutpostLink = ({ id, ownerId }: Props) => {
  const t = useTranslations("OutpostLink");
  const { playerId } = usePlayerContext();
  const label = playerId === ownerId ? t("Manage") : t("View");

  return <NavigationLink href={`/outpost/${id}`}>{label}</NavigationLink>;
};

export default OutpostLink;
