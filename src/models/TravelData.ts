import { UnknownData } from "./UnknownData";

type TravelData = {
  locationId: string;
  dataType: "TravelData";
} & UnknownData;

export default TravelData;
