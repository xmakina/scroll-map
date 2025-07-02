import OutpostRepository from "@/repositories/OutpostRepository";
import NameGenerator from "@/utils/NameGenerator";

export default class {
  async create(playerId: string, locationId: string) {
    const label = NameGenerator.ForOutposts();
    return await this.repository.create({
      playerId,
      planetId: locationId,
      label,
    });
  }
  async getAll(planetId: string) {
    return await this.repository.getAll(planetId);
  }
  async get(id: string) {
    return await this.repository.get(id);
  }
  constructor(private readonly repository: OutpostRepository) {}

  static async get() {
    return new this(await OutpostRepository.get());
  }
}
