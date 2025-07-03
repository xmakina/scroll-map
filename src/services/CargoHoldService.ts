import CargoHoldRepository from "@/repositories/CargoHoldRepository";
import { CargoType } from "@prisma/client";
import CargoContainerService from "./CargoContainerService";
import getCostBreakdowns from "@/utils/getCostBreakdowns";
import { Cost } from "@/models/CostAndRequirements/CostAndRequirements";

export default class {
  async consumeCost(id: string, cost: Cost) {
    const cargoHold = await this.get(id);
    const costBreakdowns = getCostBreakdowns(cost, cargoHold);
    const canAfford = costBreakdowns.every((b) => b.available >= b.required);
    if (!canAfford) {
      throw Error("You cannot afford this component");
    }

    const consumptionUpdates = Object.keys(cost)
      .map((c) => c as CargoType)
      .map(async (type) => {
        const amount = cost[type] ?? 0;
        return await this.consume(id, type, amount);
      });

    return await Promise.all(consumptionUpdates);
  }

  async consume(id: string, type: CargoType, amount: number) {
    const cargoHold = await this.get(id);

    const cargoContainer = cargoHold.CargoContainers.find(
      (c) => c.type == type
    );

    if (!cargoContainer) {
      throw Error(`Cargo container not found in Cargo Hold ${id}, ${type}`);
    }

    return this.cargoContainerService.removeFrom(cargoContainer, amount);
  }

  async empty(id: string) {
    const cargoHold = await this.get(id);
    const emptyPromises = cargoHold.CargoContainers.map((c) =>
      this.consume(id, c.type, c.amount)
    );

    await Promise.all(emptyPromises);
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
