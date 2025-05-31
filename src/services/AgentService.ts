import AgentRepository from "@/repositories/AgentRepository";
import { NavigationDirection } from "@/types/NavigationDirection";

export default class AgentService {
  constructor(private readonly repository: AgentRepository) {}

  static async get() {
    return new AgentService(await AgentRepository.get());
  }

  async createAgent(userId: string) {
    return await this.repository.createAgent(userId);
  }

  async findAgents(userId: string) {
    return await this.repository.findAgents(userId);
  }

  async moveAgent(agentId: string, direction: NavigationDirection) {
    switch (direction) {
      case "N":
        return await this.repository.moveAgent(agentId, 0, 1);
      case "S":
        return await this.repository.moveAgent(agentId, 0, -1);
      case "E":
        return await this.repository.moveAgent(agentId, 1, 0);
      case "W":
        return await this.repository.moveAgent(agentId, -1, 0);
    }
  }

  // async interactWithPlant(agentId:string verb: PlantInteractions, symbol: PlantSymbol) {
  //   const agent = await this.repository.getAgent(agentId)

  //   switch (verb) {
  //     case "harvest": {
  //       // this.repository.addToInventory(symbol)
  //       // this.repository.addInteractionTimer(verb, symbol, agent.positionX, agent.positionY)
  //     }
  //   }
  // }
}

export type PlantInteractions = "harvest";
