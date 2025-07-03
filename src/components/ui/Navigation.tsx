import Link from "next/link";
import React from "react";
import { LinkButtonProps } from "./LinkButtonProps";

export const NavigationLink = ({ children, href }: LinkButtonProps) => (
  <Link
    className="border border-blue-900 text-blue-400 max-h-12 p-4 m-2 flex justify-center items-center rounded-xl hover:bg-alternate"
    href={href}
  >
    {children}
  </Link>
);

const Navigation = async () => {
  return (
    <>
      <NavigationLink href="/greeting">Greeting</NavigationLink>
    </>
  );
};

export default Navigation;
