import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";
import { CargoType } from "@prisma/client";
import { findLowestCargo } from "./findLowestCargo";

const cargoContainer = (type: CargoType, amount: number) => ({
  type,
  id: "",
  data: null,
  amount,
  cargoHoldId: "",
});

describe("with find lowest cargo utility", () => {
  const basicResources: CargoType[] = [CargoType.GAS, CargoType.ICE];

  describe("with cargo hold containing all resources", () => {
    const cargoHold: CargoHoldWithContainers = {
      id: "",
      data: null,
      CargoContainers: [
        cargoContainer(CargoType.GAS, 10),
        cargoContainer(CargoType.ICE, 1),
      ],
    };

    it("picks the lowest cargo type", () => {
      const result = findLowestCargo(cargoHold, basicResources);
      expect(result).toEqual(CargoType.ICE);
    });
  });

  describe("with cargo hold missing one resource", () => {
    const cargoHold: CargoHoldWithContainers = {
      id: "",
      data: null,
      CargoContainers: [cargoContainer(CargoType.GAS, 10)],
    };

    it("picks the lowest cargo type", () => {
      const result = findLowestCargo(cargoHold, basicResources);
      expect(result).toEqual(CargoType.ICE);
    });
  });

  describe("with cargo hold missing two resources", () => {
    const cargoHold: CargoHoldWithContainers = {
      id: "",
      data: null,
      CargoContainers: [],
    };

    it("picks the first in the cargo type list", () => {
      const result = findLowestCargo(cargoHold, basicResources);
      expect(result).toEqual(CargoType.GAS);
    });
  });

  describe("with cargo hold containing equal amount of resources", () => {
    const cargoHold: CargoHoldWithContainers = {
      id: "",
      data: null,
      CargoContainers: [
        cargoContainer(CargoType.GAS, 10),
        cargoContainer(CargoType.ICE, 10),
      ],
    };

    it("picks the last in the cargo hold list", () => {
      const result = findLowestCargo(cargoHold, basicResources);
      expect(result).toEqual(CargoType.ICE);
    });
  });
});
