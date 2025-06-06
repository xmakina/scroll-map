import StationRepository from "@/repositories/StationRepository";

export default class StationService {
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
