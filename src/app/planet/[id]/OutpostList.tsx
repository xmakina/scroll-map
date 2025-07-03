import BorderedBox from "@/components/ui/BorderedBox";
import { OutpostWithComponents } from "@/models/OutpostWithComponents";
import { getTranslations } from "next-intl/server";
import React from "react";
import OutpostSummary from "./OutpostSummary";

type Props = {
  outposts: OutpostWithComponents[];
};

const OutpostList = async ({ outposts }: Props) => {
  const t = await getTranslations("OutpostList");

  return (
    <BorderedBox title={t("Outposts")}>
      <div className="flex flex-col items-center gap-2">
        {outposts.length === 0 && <div className="italic">None</div>}
        {outposts.map((o) => (
          <OutpostSummary
            outpost={o}
            key={o.id}
          />
        ))}
      </div>
    </BorderedBox>
  );
};

export default OutpostList;
