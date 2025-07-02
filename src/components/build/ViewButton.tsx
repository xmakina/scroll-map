import { useTranslations } from "next-intl";
import React from "react";
import Button from "../ui/Button";

type Props = {
  onClick: () => void;
};

const ViewButton = ({ onClick }: Props) => {
  const t = useTranslations("general");
  return <Button onClick={onClick}>{t("View")}</Button>;
};

export default ViewButton;
