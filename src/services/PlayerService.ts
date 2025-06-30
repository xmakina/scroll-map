import PlayerRepository from "@/repositories/PlayerRepository";

export default class PlayerService {
  constructor(private readonly repository: PlayerRepository) {}

  static async get() {
    return new PlayerService(await PlayerRepository.get());
  }

  async createPlayer(userId: string) {
    return await this.repository.createPlayer(userId);
  }

  async findPlayer(userId: string) {
    return await this.repository.getPlayer(userId);
  }

  async totalPlayers() {
    return await this.repository.totalPlayers();
  }
}
