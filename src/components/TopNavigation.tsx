"use client";

import React from "react";
import { NavigationLink } from "./ui/Navigation";
import { useTranslations } from "next-intl";
import Flyout from "./ui/Flyout";

const TopNavigation = () => {
  const t = useTranslations("Layout");
  const navigationLinks = (
    <>
      <NavigationLink href="/dashboard">{t("Dashboard")}</NavigationLink>
      <NavigationLink href="/ship">{t("Ships")}</NavigationLink>
      <NavigationLink href="/planet">{t("Planets")}</NavigationLink>
      <NavigationLink href="/outpost">{t("Outposts")}</NavigationLink>
    </>
  );

  return (
    <div>
      <div className="md:hidden block">
        <Flyout>{navigationLinks}</Flyout>
      </div>
      <div className="hidden flex-row gap-2 justify-between items-center md:flex">
        {navigationLinks}
      </div>
    </div>
  );
};

export default TopNavigation;
