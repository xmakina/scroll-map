import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Button from "./Button";

type Props = {
  onIncrease: () => Promise<void>;
  onDecrease: () => Promise<void>;
  label: string;
};

const PlusMinusButtons = ({ onIncrease, onDecrease, label }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-3">
        <Button onClick={onIncrease}>
          <FaPlus />
        </Button>
        <Button onClick={onDecrease}>
          <FaMinus />
        </Button>
      </div>
      {label}
    </div>
  );
};

export default PlusMinusButtons;
