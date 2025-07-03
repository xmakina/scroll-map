import JsonData from "./IActivityData";

type OneProp<T> = {
  [P in keyof T]-?: Record<P, T[P]>;
}[keyof T];

type RequireAtLeastOne<T> = T & OneProp<T>;

type BerthLocations = {
  outpostId?: string;
  stationId?: string;
};

export type BerthLocation = RequireAtLeastOne<BerthLocations>;

export default class implements JsonData {
  public readonly dataType = "BerthData";

  constructor(
    public readonly location: BerthLocation,
    public readonly label: string
  ) {}
}
