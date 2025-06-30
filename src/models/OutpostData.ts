import { UnknownData } from "./UnknownData";

export type OutpostData = {
  planetId: string;
  dataType: "OutpostData";
} & UnknownData;
