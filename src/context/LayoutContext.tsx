"use client";

import React, { useMemo, useState } from "react";
import { createContext, ReactNode, useContext } from "react";

type LayoutSettings = {
  showNavigation: boolean;
};

type LayoutContextValue = {
  layout: LayoutSettings;
  changeNavigation: (showNavigation: boolean) => void;
};

const LayoutContextValue = createContext<LayoutContextValue | undefined>(
  undefined
);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<LayoutSettings>({
    showNavigation: true,
  });

  const value = useMemo(() => {
    const changeNavigation = (showNavigation: boolean) => {
      console.log("changing navigation", showNavigation);
      setLayout({ ...layout, showNavigation });
    };

    return { layout, changeNavigation };
  }, [layout, setLayout]);

  return (
    <LayoutContextValue.Provider value={value}>
      {children}
    </LayoutContextValue.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContextValue);
  if (context === undefined) {
    throw new Error("LayoutContext used without a provider");
  }

  return context;
};
