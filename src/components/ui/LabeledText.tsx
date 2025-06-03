import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
  column?: boolean;
};

const LabeledText = ({ label, children, className, column = false }: Props) => {
  return (
    <div
      className={clsx(
        "flex  items-center justify-end gap-1",
        {
          "flex-row": !column,
          "flex-col": column,
        },
        className
      )}
    >
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
};

export default LabeledText;
