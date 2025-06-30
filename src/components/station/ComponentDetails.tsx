import StationComponentData from "@/models/JsonData/StationComponentData";
import getJsonData from "@/utils/getJsonData";
import { StationComponent } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  component: StationComponent;
};

const ComponentDetails = ({ component }: Props) => {
  const t = useTranslations("ComponentDetails");
  const data: StationComponentData = getJsonData(component.data);

  return (
    <div>
      <div>
        {t(component.type)} ({t("level {level}", { ...data })})
      </div>
    </div>
  );
};

export default ComponentDetails;
