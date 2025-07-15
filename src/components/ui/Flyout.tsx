"use client";

import React, { ReactNode, useState } from "react";
import Button from "./Button";
import { useTranslations } from "next-intl";
import ClickAwayListener from "react-click-away-listener";

type Props = {
  isOpen?: boolean;
  children: ReactNode;
};

const Flyout = ({ isOpen = false, children }: Props) => {
  const t = useTranslations("Flyout");
  const [open, setOpen] = useState(isOpen);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="fixed right-0 bottom-1 z-50">
        <div className="flex flex-col-reverse gap-2 justify-items-end">
          <div className="flex flex-col items-end flex-shrink">
            <div className="w-min">
              <Button className="bg-primary" onClick={() => setOpen(!open)}>
                {t("Menu")}
              </Button>
            </div>
          </div>
          <div hidden={!open} className="bg-black border border-slate-600">
            {children}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Flyout;
