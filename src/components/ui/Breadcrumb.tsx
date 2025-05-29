import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { LinkButtonProps } from "./LinkButtonProps";
import Link from "next/link";

type Props = {
  governmentId?: string;
  governmentName?: string;
  starSystemId?: string;
  starSystemName?: string;
  destinationUrl?: string;
  destinationName?: string;
};

export const BreadcrumbLink = ({ children, href }: LinkButtonProps) => (
  <Link
    className="text-sm p-1 flex justify-center items-start rounded-xl hover:bg-alternate hover:text-secondary"
    href={href}
  >
    <div className="flex flew-row gap-1 justify-between items-center">
      <FaChevronLeft />
      <div>{children}</div>
    </div>
  </Link>
);

const Breadcrumb = ({
  governmentId,
  governmentName,
  starSystemId,
  starSystemName,
  destinationUrl,
  destinationName,
}: Props) => {
  return (
    <div className="flex flew-row w-full flex-grow-0 justify-start">
      {governmentId && (
        <BreadcrumbLink href={`/government/${governmentId}`}>
          {governmentName}
        </BreadcrumbLink>
      )}
      {starSystemId && (
        <BreadcrumbLink href={`/starsystem/${starSystemId}`}>
          {starSystemName}
        </BreadcrumbLink>
      )}
      {destinationUrl && (
        <BreadcrumbLink href={destinationUrl}>{destinationName}</BreadcrumbLink>
      )}
    </div>
  );
};

export default Breadcrumb;
