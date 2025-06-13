import { StationComponentRequirement } from "@/models/StationComponents";
import { StationData } from "@/models/StationData";
import StationRepository from "@/repositories/StationRepository";
import getCostBreakdowns from "@/utils/getCostBreakdowns";
import CargoHoldService from "./CargoHoldService";

const cargoHoldService = await CargoHoldService.get();
export default class StationService {
  async beginBuildComponent(
    id: string,
    requirements: StationComponentRequirement
  ) {
    const station = await this.get(id);
    const costBreakdowns = getCostBreakdowns(requirements, station.CargoHold);
    const canAfford = costBreakdowns.every((b) => b.available >= b.required);
    if (!canAfford) {
      throw Error("You cannot afford this component");
    }

    await cargoHoldService.consume(
      station.cargoHoldId,
      costBreakdowns.map((c) => ({ type: c.cargoType, amount: c.required }))
    );
  }

  async setTugDeployed(id: string, tugDeployed: boolean) {
    return await this.repository.updateStation(id, { tugDeployed });
  }

  async get(id: string) {
    return await this.repository.getStation(id);
  }

  async maybeGet(id: string) {
    return await this.repository.maybeGetStation(id);
  }

  async updateStation(stationId: string, data: Partial<StationData>) {
    return await this.repository.updateStation(stationId, data);
  }

  async getStations(playerId: string) {
    return await this.repository.getStations(playerId);
  }

  async createStation(xy: { x: number; y: number }, playerId: string) {
    return await this.repository.createStation(xy, playerId);
  }

  constructor(private readonly repository: StationRepository) {}

  static async get() {
    return new StationService(await StationRepository.get());
  }
}
