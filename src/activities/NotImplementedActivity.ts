import { ActivityWorkerWithActivity } from "@/models/WorkerWithActivity";
import { IActivityHandler } from "./IActivityHandler";

export class NotImplementedActivity implements IActivityHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  claim(_activityWorker: ActivityWorkerWithActivity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  begin(_activityWorkerId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
