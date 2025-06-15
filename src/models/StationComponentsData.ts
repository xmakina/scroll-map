import { StationComponentType } from "@prisma/client";

type StationComponentData = {
  type: StationComponentType;
  level: number;
};

export default StationComponentData;
