import StationComponentRepository from "@/repositories/StationComponentRepository";
import StationService from "./StationService";
import BuildActivityData from "@/models/JsonData/BuildActivityData";
import { StationComponentType } from "@prisma/client";

export default class {
  async buildComponent(
    stationId: string,
    data: BuildActivityData<StationComponentType>
  ) {
    const station = await this.stationService.get(stationId);
    const existingComponent = station.Components.find(
      (c) => c.type === data.type
    );

    if (existingComponent) {
      return await this.repository.upgrade(existingComponent.id, data.level);
    }

    return await this.repository.create(stationId, data.type, {
      level: data.level,
      dataType: "StationComponentData"
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
