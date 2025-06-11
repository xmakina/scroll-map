import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";

export interface IActivityHandler {
  claim(activityWorker: ActivityWorkerWithActivity): Promise<void>;
  begin(activityWorkerId: string, data?: object): Promise<void>;
}
