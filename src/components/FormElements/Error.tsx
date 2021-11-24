import React from "react";

interface ErrorProps {
  errors: any;
  name: string;
  label: string;
  customErrorMessage?: string;
}
export const Error: React.FC<ErrorProps> = ({
  errors,
  name,
  label,
  customErrorMessage,
}) => {
  console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] errors", errors);
  switch (errors[name]?.type) {
    case "required":
      return !!customErrorMessage ? (
        <div>{customErrorMessage}</div>
      ) : (
        <div>{label} is required</div>
      );
    case "pattern":
      return !!customErrorMessage ? (
        <div>{customErrorMessage}</div>
      ) : (
        <div>{label} is not correct, please enter something valid</div>
      );
    case "maxLength":
      return !!customErrorMessage ? (
        <div>{customErrorMessage}</div>
      ) : (
        <div>{label} is too long, please enter something valid</div>
      );
    case "minLength":
      return !!customErrorMessage ? (
        <div>{customErrorMessage}</div>
      ) : (
        <div>{label} is too short, please enter something valid</div>
      );
    default:
      return <></>;
  }
};
