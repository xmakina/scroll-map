import Button from "@/components/ui/Button";
import React from "react";

type Props = {
  onDeployTug?: () => Promise<void> | void;
};

const TugManager = ({ onDeployTug }: Props) => {
  return (
    <div>
      <Button onClick={onDeployTug}>Deploy Tug</Button>
    </div>
  );
};

export default TugManager;
