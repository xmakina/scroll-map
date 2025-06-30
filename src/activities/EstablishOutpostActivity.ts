/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";
import ActivityService from "@/services/ActivityService";

export default class implements IActivityHandler {
  constructor(private readonly activityService: ActivityService) {}

  async claim(activityWorker: ActivityWorkerWithActivity): Promise<void> {
    throw new Error("Not yet implemented");
  }

  async begin(activityWorkerId: string): Promise<void> {
    throw new Error("Not yet implemented");
  }
}
