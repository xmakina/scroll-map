"use client";

import { NavigationLink } from "@/components/ui/Navigation";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  id: string;
  owned?: boolean;
};

const OutpostLink = ({ id, owned = false }: Props) => {
  const t = useTranslations("OutpostLink");
  const label = owned ? t("Manage") : t("View");

  return <NavigationLink href={`/outpost/${id}`}>{label}</NavigationLink>;
};

export default OutpostLink;
