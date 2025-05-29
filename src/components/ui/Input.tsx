import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input
      {...props}
      className={`bg-primary border p-1 text-secondary ${props.className}`}
    ></input>
  );
};
export default Input;
