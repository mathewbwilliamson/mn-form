import React from "react";
import styled from "styled-components";

const ErrorMessage = styled.div`
  padding: 0.3rem 0;
  text-align: left;
  font-size: 0.85rem;
  color: red;
`;

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
  switch (errors[name]?.type) {
    case "required":
      return !!customErrorMessage ? (
        <ErrorMessage>{customErrorMessage}</ErrorMessage>
      ) : (
        <ErrorMessage>{label} is required</ErrorMessage>
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
