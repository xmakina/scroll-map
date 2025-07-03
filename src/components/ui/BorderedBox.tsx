import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const BorderedBox = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col border border-gray-600 rounded-md p-2 gap-2">
      <div className="text-md text-center italic">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default BorderedBox;
