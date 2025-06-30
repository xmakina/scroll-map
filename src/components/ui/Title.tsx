import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  return <div className="text-xl italic text-center w-full">{children}</div>;
};

export default Title;
