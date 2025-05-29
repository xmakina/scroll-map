import React, { HTMLInputTypeAttribute, ReactNode } from "react";

import Label from "./Label";
import Input from "./Input";

type Props = {
  id: string;
  children: ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  checked?: boolean;
  errors?: string[];
  className?: string;
  autoComplete?: "off";
};

const LabeledInput = ({
  id,
  value,
  onChange,
  type,
  checked,
  children,
  className,
  autoComplete,
  errors = [],
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-end gap-1">
        <Label htmlFor={id}>{children}</Label>
        <Input
          name={id}
          onChange={onChange}
          value={value}
          type={type}
          checked={checked}
          className={className}
          autoComplete={autoComplete}
        ></Input>
      </div>
      <div className="flex flex-row justify-end align-top">
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {errors.map((error: string) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabeledInput;
