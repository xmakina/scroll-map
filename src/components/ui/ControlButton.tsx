import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  onClick: () => Promise<void>;
  active: boolean;
  children: ReactNode;
  className: string;
};

const ControlButton = ({ onClick, active, className, children }: Props) => {
  return (
    <div
      className={clsx("p-3 border rounded-md", {
        "cursor-pointer": !active,
      })}
      onClick={onClick}
    >
      <div className={clsx({ [className]: active })}>{children}</div>
    </div>
  );
};

export default ControlButton;
