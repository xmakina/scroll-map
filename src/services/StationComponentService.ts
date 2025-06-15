import StationComponentData from "@/models/StationComponentsData";
import StationComponentRepository from "@/repositories/StationComponentRepository";

export default class {
  async createComponent(stationId: string, data: StationComponentData) {
    return await this.repository.create(stationId, data);
  }

  constructor(private readonly repository: StationComponentRepository) {}

  static async get() {
    return new this(await StationComponentRepository.get());
  }
}
