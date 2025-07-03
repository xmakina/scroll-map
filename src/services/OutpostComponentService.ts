import { OutpostComponentType } from "@prisma/client";
import OutpostService from "./OutpostService";
import OutpostComponentRepository from "@/repositories/OutpostComponentRepository";
import OutpostComponentData from "@/models/JsonData/OutpostComponentData";

export default class {
  async buildComponent(stationId: string, type: OutpostComponentType) {
    const outpost = await this.outpostService.get(stationId);
    const existingComponent = outpost.Components.find((c) => c.type === type);

    if (existingComponent) {
      return await this.repository.upgrade(existingComponent.id);
    }

    return await this.repository.create(
      stationId,
      type,
      new OutpostComponentData(1)
    );
  }

  constructor(
    private readonly repository: OutpostComponentRepository,
    private readonly outpostService: OutpostService
  ) {}

  static async get() {
    return new this(
      await OutpostComponentRepository.get(),
      await OutpostService.get()
    );
  }
}
