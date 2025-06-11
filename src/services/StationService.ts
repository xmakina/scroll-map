import { StationData } from "@/models/StationData";
import StationRepository from "@/repositories/StationRepository";

export default class StationService {
  async setTugDeployed(id: string, tugDeployed: boolean) {
    return await this.repository.updateStation(id, { tugDeployed });
  }

  async get(id: string) {
    return await this.repository.getStation(id);
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
