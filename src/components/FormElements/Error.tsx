import React from "react";

interface ErrorProps {
  errors: any;
  name: string;
  label: string;
}
export const Error: React.FC<ErrorProps> = ({ errors, name, label }) => {
  return <>{errors[name]?.type === "required" && `${label} is required`}</>;
};
