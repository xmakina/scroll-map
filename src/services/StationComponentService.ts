import StationComponentRepository from "@/repositories/StationComponentRepository";
import StationService from "./StationService";
import { StationComponentType } from "@prisma/client";

export default class {
  async buildComponent(stationId: string, type: StationComponentType) {
    const station = await this.stationService.get(stationId);
    const existingComponent = station.Components.find((c) => c.type === type);

    if (existingComponent) {
      return await this.repository.upgrade(existingComponent.id);
    }

    return await this.repository.create(stationId, type, {
      level: 1,
      dataType: "StationComponentData",
    });
  }

  constructor(
    private readonly repository: StationComponentRepository,
    private readonly stationService: StationService
  ) {}

  static async get() {
    return new this(
      await StationComponentRepository.get(),
      await StationService.get()
    );
  }
}
