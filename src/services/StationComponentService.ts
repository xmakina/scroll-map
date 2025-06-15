import StationComponentData from "@/models/StationComponentsData";
import StationComponentRepository from "@/repositories/StationComponentRepository";
import StationService from "./StationService";

export default class {
  async buildComponent(stationId: string, data: StationComponentData) {
    const station = await this.stationService.get(stationId)
    const existingComponent = station.Components.find((c) => c.type === data.type)

    if (existingComponent) {
      return await this.repository.upgrade(existingComponent.id, data)
    }

    return await this.repository.create(stationId, data);
  }

  constructor(private readonly repository: StationComponentRepository, private readonly stationService:StationService) {}

  static async get() {
    return new this(await StationComponentRepository.get(), await StationService.get());
  }
}
