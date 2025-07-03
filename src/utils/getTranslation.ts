import {
  CargoType,
  OutpostComponentType,
  StationComponentType,
} from "@prisma/client";
import { useTranslations } from "next-intl";

export const getCargoTypeTranslation = (cargoType: CargoType) => {
  const t = useTranslations("CargoType");
  return t(cargoType);
};

export const getComponentTypeTranslation = (
  componentType: OutpostComponentType | StationComponentType
) => {
  const t = useTranslations("Component Type");
  return t(componentType);
};
