import OutpostRepository from "@/repositories/OutpostRepository";
import NameGenerator from "@/utils/NameGenerator";
import OutpostComponentRepository from "@/repositories/OutpostComponentRepository";
import OutpostComponentData from "@/models/JsonData/OutpostComponentData";

export default class {
  async create(playerId: string, locationId: string) {
    const label = NameGenerator.ForOutposts();
    const outpost = await this.repository.create({
      playerId,
      planetId: locationId,
      label,
    });

    await this.outpostComponentRepository.create(
      outpost.id,
      "MAKESHIFT_LAUNCH_PAD",
      new OutpostComponentData(1)
    );
  }
  async getAllForPlayer(playerId: string) {
    return await this.repository.getAllForPlayer(playerId);
  }
  async getAllForPlanet(planetId: string) {
    return await this.repository.getAllForPlanet(planetId);
  }
  async get(id: string) {
    return await this.repository.get(id);
  }
  constructor(
    private readonly repository: OutpostRepository,
    private readonly outpostComponentRepository: OutpostComponentRepository
  ) {}

  static async get() {
    return new this(
      await OutpostRepository.get(),
      await OutpostComponentRepository.get()
    );
  }
}
