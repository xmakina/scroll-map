import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  needed: number;
  available: number;
  children: ReactNode;
};

const NeededAvailable = ({ needed, available, children }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <div>{children}</div>
      <div className="flex flex-row">
        <div
          className={clsx({
            "text-green-600": available >= needed,
            "text-red-600": available < needed,
          })}
        >
          {available}
        </div>
        /<div>{needed}</div>
      </div>
    </div>
  );
};

export default NeededAvailable;
