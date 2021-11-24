import React from "react";
import styled, { css } from "styled-components";

const ButtonContainer = styled.input`
  margin: 24px;
  width: 165px;
  align-self: center;
  height: 2rem;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;

  ${(props) =>
    props.disabled &&
    css`
      background-color: lightgrey;
      color: darkgrey;
      cursor: wait;
    `}
`;
interface ButtonProps {
  isDisabled: boolean;
}

export const Button: React.FC<ButtonProps> = ({ isDisabled }) => {
  return <ButtonContainer type="submit" disabled={isDisabled} />;
};
