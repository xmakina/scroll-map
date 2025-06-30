"use client";
import { CargoType } from "@prisma/client";
import { useTranslations } from "next-intl";

export default function (cargoType: CargoType) {
  const t = useTranslations("CargoType");
  return t(cargoType);
}
