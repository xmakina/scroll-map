import { Cost } from "@/models/CostAndRequirements/CostAndRequirements";
import { StationData } from "@/models/StationData";
import StationRepository from "@/repositories/StationRepository";
import getCostBreakdowns from "@/utils/getCostBreakdowns";
import CargoHoldService from "./CargoHoldService";
import ConstructStationOrders from "./ConstructStationOrders";

const cargoHoldService = await CargoHoldService.get();
export default class StationService {
  async getOrders(id: string) {
    const station = await this.repository.get(id);
    const orders = ConstructStationOrders(station);

    return orders;
  }

  async consumeFromCargoHold(id: string, cost: Cost) {
    const station = await this.get(id);
    const costBreakdowns = getCostBreakdowns(cost, station.CargoHold);
    const canAfford = costBreakdowns.every((b) => b.available >= b.required);
    if (!canAfford) {
      throw Error("You cannot afford this component");
    }

    await cargoHoldService.consume(
      station.cargoHoldId,
      costBreakdowns.map((c) => ({ type: c.cargoType, amount: c.required }))
    );
  }

  async get(id: string) {
    return await this.repository.get(id);
  }

  async maybeGet(id: string) {
    return await this.repository.maybeGet(id);
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
