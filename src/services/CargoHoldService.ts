import CargoHoldRepository from "@/repositories/CargoHoldRepository";
import { CargoType } from "@prisma/client";
import CargoContainerService from "./CargoContainerService";

export default class {
  async consume(
    id: string,
    consumptionList: { type: CargoType; amount: number }[]
  ) {
    const cargoHold = await this.get(id);

    const consumptionUpdates = consumptionList.map((consumption) => {
      const cargoContainer = cargoHold.CargoContainers.find(
        (c) => c.type == consumption.type
      );

      if (!cargoContainer) {
        throw Error(
          `Cargo container not found in Cargo Hold ${id}, ${consumption.type}`
        );
      }

      return this.cargoContainerService.removeFrom(
        cargoContainer,
        consumption.amount
      );
    });

    await Promise.all(consumptionUpdates);
  }

  async provide(
    id: string,
    provisionList: { type: CargoType; amount: number }[]
  ) {
    const cargoHold = await this.get(id);

    const provisionUpdates = provisionList.map((provision) => {
      const cargoContainer = cargoHold.CargoContainers.find(
        (c) => c.type == provision.type
      );

      if (cargoContainer) {
        return this.cargoContainerService.addTo(
          cargoContainer,
          provision.amount
        );
      }

      return this.cargoContainerService.create(
        id,
        provision.type,
        provision.amount
      );
    });

    await Promise.all(provisionUpdates);
  }

  async get(id: string) {
    return await this.repository.get(id);
  }

  constructor(
    private readonly repository: CargoHoldRepository,
    private readonly cargoContainerService: CargoContainerService
  ) {}

  static async get() {
    return new this(
      await CargoHoldRepository.get(),
      await CargoContainerService.get()
    );
  }
}
