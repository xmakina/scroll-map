import ComponentType from "@/models/ComponentType";
import getJsonData from "@/utils/getJsonData";
import { getComponentTypeTranslation } from "@/utils/getTranslation";
import { JsonValue } from "@prisma/client/runtime/library";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  type: ComponentType;
  data: JsonValue;
};

function getLevelFromJsonData(data: JsonValue) {
  const { level } = getJsonData<{ level: number; dataType: "" }>(data);
  return level;
}

const ComponentDetails = ({ type, data }: Props) => {
  const t = useTranslations("ComponentDetails");

  const level = getLevelFromJsonData(data);

  return (
    <div>
      <div>
        {getComponentTypeTranslation(type)} ({t("level {level}", { level })})
      </div>
    </div>
  );
};

export default ComponentDetails;
