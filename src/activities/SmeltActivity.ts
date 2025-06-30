import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import { ActivityType, CargoType, StationComponentType } from "@prisma/client";
import ActivityService from "@/services/ActivityService";
import CargoHoldService from "@/services/CargoHoldService";
import SmeltData from "@/models/JsonData/SmeltData";
import StationService from "@/services/StationService";
import { Cost } from "@/models/CostAndRequirements/CostAndRequirements";
import { getComponentLevel } from "@/utils/getComponentLevel";
import getJsonData from "@/utils/getJsonData";

export default class implements IActivityHandler {
  constructor(
    private readonly cargoHoldService: CargoHoldService,
    private readonly stationService: StationService,
    private readonly activityService: ActivityService
  ) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw "Activity not present";
    }

    const parent = await this.activityService.getWorker(activityWorker.id);
    const station = parent.Station;
    if (!station) {
      throw Error("Only stations can smelt");
    }

    const cargoHoldId = station.cargoHoldId;
    if (!cargoHoldId) {
      throw Error("No cargo hold found while claiming scavenge");
    }

    const smeltData: SmeltData = getJsonData(activity.data);
    const cargoTypes = Object.keys(smeltData.output).map((k) => k as CargoType);

    const addPromises = cargoTypes.map(
      async (targetCargoType) =>
        await this.cargoHoldService.provide(cargoHoldId, [
          {
            type: targetCargoType,
            amount: smeltData.output[targetCargoType] || 0,
          },
        ])
    );

    await Promise.all(addPromises);
  }

  async begin(activityWorkerId: string): Promise<void> {
    const activityWorker = await this.activityService.getWorker(
      activityWorkerId
    );

    const stationId = activityWorker.Station?.id;
    if (!stationId) {
      throw new Error("Only stations can smelt");
    }

    const station = await this.stationService.get(stationId);

    const smelterLevel = getComponentLevel(
      station.Components,
      StationComponentType.SMELTER
    );

    if (!smelterLevel) {
      throw new Error(`No smelter was found for station ${stationId}`);
    }

    const minGas = 500;
    const minOre = 500;

    const currentOre =
      station.CargoHold.CargoContainers.find((c) => c.type === CargoType.ORE)
        ?.amount || 0;
    const currentGas =
      station.CargoHold.CargoContainers.find((c) => c.type === CargoType.GAS)
        ?.amount || 0;

    if (currentGas < minGas || currentOre < minOre) {
      throw new Error("Insufficient resources");
    }

    const max = smelterLevel * 500;

    const currentMin = Math.min(currentGas, currentOre);
    const roundedCurrentMin = Math.floor(currentMin / 500) * 500;

    const amountToUse = Math.min(roundedCurrentMin, max);

    const smeltData: SmeltData = {
      output: { ALLOY: amountToUse },
      dataType: "SmeltData",
    };

    const cost: Cost = { ORE: amountToUse, GAS: amountToUse };

    await this.stationService.consumeFromCargoHold(stationId, cost);
    await this.activityService.create(
      activityWorkerId,
      ActivityType.SMELT,
      1,
      smeltData
    );
  }
}
