import PlayerRepository from "@/repositories/PlayerRepository";

export default class PlayerService {
  constructor(private readonly repository: PlayerRepository) {}

  static async get() {
    return new PlayerService(await PlayerRepository.get());
  }

  async createPlayer(userId: string) {
    return await this.repository.createAgent(userId);
  }

  async findPlayer(userId: string) {
    return await this.repository.getPlayer(userId);
  }
}
