import clsx from "clsx";
import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

interface SliderProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  min: number;
  max: number;
  value: number;
  onTransferAmountChanged: (amount: number) => void;
}

const Slider = ({
  min,
  max,
  onTransferAmountChanged,
  step = 1,
  ...props
}: SliderProps) => {
  const [value, setValue] = useState(props.value);

  const handleOnChange = (amount: number) => {
    setValue(amount);
    onTransferAmountChanged(amount);
  };

  return (
    <input
      {...props}
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      className={clsx(
        "bg-alternate border p-1 text-secondary w-full",
        props.className
      )}
      onChange={(e) => handleOnChange(+e.target.value)}
    ></input>
  );
};
export default Slider;
