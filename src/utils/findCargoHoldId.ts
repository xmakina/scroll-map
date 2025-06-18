import { ActivityWorkerWithParent } from "@/models/WorkerWithActivity";

export default function (activityWorker: ActivityWorkerWithParent): string {
  const possible =
    activityWorker.Ship?.cargoHoldId || activityWorker.Station?.cargoHoldId;
  if (possible === undefined) {
    throw new Error(
      `No ship or station linked to activity worker ${activityWorker.id}`
    );
  }

  return possible;
}
