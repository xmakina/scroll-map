import clsx from "clsx";
import React, { ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

type Props = {
  children: ReactNode;
  isBusy: boolean;
};

const Busy = ({ isBusy, children }: Props) => {
  return (
    <div className="flex flex-col justify-between items-center m-3">
      {isBusy && <FaSpinner className="animate-spin absolute mt-1" />}
      <span className={clsx({ invisible: isBusy })}>{children}</span>
    </div>
  );
};

export default Busy;
