import { FC, SelectHTMLAttributes } from "react";

const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ ...props }) => {
  return (
    <select
      className="bg-primary text-secondary border rounded-sm p-2"
      {...props}
    ></select>
  );
};

export default Select;
