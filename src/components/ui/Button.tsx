"use client";

import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useState,
} from "react";
import Busy from "./Busy";
import clsx from "clsx";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  danger?: boolean;
  primary?: boolean;
  small?: boolean;
  onClick?: () => Promise<void> | void;
  noHover?: boolean;
  active?: boolean;
}

const Button = ({
  danger,
  primary,
  active,
  small,
  children,
  onClick,
  noHover,
  ...props
}: ButtonProps) => {
  const [busy, setBusy] = useState(false);
  const handleClick = async () => {
    if (!onClick || props.disabled) {
      return;
    }

    setBusy(true);
    await onClick();
    setBusy(false);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={clsx(
        "border border-white rounded-3xl p-1 flex flex-row justify-evenly disabled:bg-alternate",
        {
          "bg-accent": primary,
          "bg-danger hover:bg-danger": danger,
          "bg-alternate": active,
          "text-sm p-0 rounded-md": small,
          "hover:bg-alternate hover:text-secondary": !noHover,
        },
        props.className
      )}
    >
      <Busy isBusy={busy}>{children}</Busy>
    </button>
  );
};
export default Button;
