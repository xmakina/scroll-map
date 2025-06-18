import { StationWithComponentsAndWorker } from "@/models/StationWithComponentsCargoHoldWorker";
import { ActivityWorkerWithParent } from "@/models/WorkerWithActivity";
import StationService from "@/services/StationService";

export default async function (
  activityWorker: ActivityWorkerWithParent,
  stationService: StationService
): Promise<StationWithComponentsAndWorker | null> {
  if (activityWorker.Ship) {
    return await stationService.maybeGet(activityWorker.Ship.locationId);
  }

  if (activityWorker.Station) {
    return await stationService.get(activityWorker.Station.id);
  }

  return null;
}

  