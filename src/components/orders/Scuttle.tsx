"use client";

import React from "react";
import Button from "../ui/Button";

type Props = {
  onClick: () => Promise<void> | void;
};

const Scuttle = ({ onClick }: Props) => {
  return <Button onClick={onClick}>Scuttle</Button>;
};

export default Scuttle;
