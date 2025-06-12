"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import { ActivityType } from "@prisma/client";

type Props = {
  onClick: () => Promise<void> | void;
};

const Scuttle = ({ onClick }: Props) => {
  const t = useTranslations("OrderButton");
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      {!confirm && (
        <Button onClick={() => setConfirm(true)}>
          {t(ActivityType.SCUTTLE)}
        </Button>
      )}
      {confirm && (
        <Button onClick={onClick} danger>
          {t("Are you sure?")}
        </Button>
      )}
    </div>
  );
};

export default Scuttle;
