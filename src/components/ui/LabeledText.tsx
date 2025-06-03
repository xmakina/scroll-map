import React, { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
};

const LabeledText = ({ label, children }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-end gap-1">
        <div>{label}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default LabeledText;
