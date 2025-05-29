import React from "react";

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  ...props
}) => {
  return <label className="p-1" {...props}></label>;
};
export default Label;
