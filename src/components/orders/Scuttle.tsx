"use client";

import React, { useState } from "react";
import Button from "../ui/Button";

type Props = {
  onClick: () => Promise<void> | void;
};

const Scuttle = ({ onClick }: Props) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      {!confirm && <Button onClick={() => setConfirm(true)}>Scuttle</Button>}
      {confirm && (
        <Button onClick={onClick} danger>
          Are you sure?
        </Button>
      )}
    </div>
  );
};

export default Scuttle;
