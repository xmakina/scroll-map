import CargoContainerRepository from "@/repositories/CargoContainerRepository";
import { CargoContainer, CargoType } from "@prisma/client";

export default class {
  async addTo(container: CargoContainer, amount: number) {
    return await this.repository.addTo(container.id, amount);
  }
  async create(cargoHoldId: string, CargoType: CargoType, amount: number) {
    return await this.repository.create(cargoHoldId, CargoType, amount);
  }

  async transfer(id: string, cargoHoldId: string) {
    return await this.repository.transfer(id, cargoHoldId);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async get(id: string) {
    return await this.repository.get(id);
  }

  constructor(private readonly repository: CargoContainerRepository) {}

  static async get() {
    return new this(await CargoContainerRepository.get());
  }
}
