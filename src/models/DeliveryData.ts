import { UnknownData } from "./UnknownData";

type DeliveryData = {
  destinationId: string;
  dataType: "DeliveryData";
} & UnknownData;

export default DeliveryData;
