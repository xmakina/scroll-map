import ActivityRepository from "@/repositories/ActivityRepository";
import { ActivityWorker } from "@prisma/client";

import { ActivityType } from "@prisma/client";
import ShipService from "./ShipService";
import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import StationService from "./StationService";
import ScuttleActivity from "@/activities/ScuttleActivity";
import { IActivityHandler } from "@/activities/IActivityHandler";
import { NotImplementedActivity } from "@/activities/NotImplementedActivity";
import BuildActivity from "@/activities/BuildActivity";
import MiningActivity from "@/activities/MiningActivity";

export default class ActivityService {
  async get(activityWorkerId: string) {
    return await this.repository.getWorker(activityWorkerId);
  }

  async claim(activityWorker: ActivityWorkerWithActivity) {
    const { Activity: activity } = activityWorker;
    if (!activity) {
      throw Error(
        `No activity assigned to activityWorker ${activityWorker.id}`
      );
    }

    await this.activities[activity.type].claim(activityWorker);
  }

  async deleteActivity(id: string) {
    return await this.repository.deleteActivity(id);
  }

  async getActivity(id: string) {
    return await this.repository.getActivity(id);
  }

  async create(
    activityWorkerId: string,
    activityType: ActivityType,
    endTime: Date,
    data?: object
  ) {
    return await this.repository.create(
      activityWorkerId,
      activityType,
      endTime,
      data
    );
  }

  async begin(
    activityWorker: ActivityWorker,
    type: ActivityType,
    data?: object
  ) {
    return await this.activities[type].begin(activityWorker.id, data);
  }

  private activities: { [key in ActivityType]: IActivityHandler };

  constructor(
    private readonly repository: ActivityRepository,
    shipService: ShipService,
    stationService: StationService
  ) {
    this.activities = {
      SCUTTLE: new ScuttleActivity(shipService, stationService, this),
      BUILD: new BuildActivity(shipService, this),
      DELIVER: new NotImplementedActivity(),
      MINE: new MiningActivity(this),
      SCAVENGE: new NotImplementedActivity(),
    };
  }

  static async get(): Promise<ActivityService> {
    return new ActivityService(
      await ActivityRepository.get(),
      await ShipService.get(),
      await StationService.get()
    );
  }
}
