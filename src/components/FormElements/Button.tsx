import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.input`
  margin: 24px;
  width: 165px;
  align-self: center;
  height: 2rem;
  background-color: black;
  color: white;
  font-weight: 600;
`;
interface ButtonProps {}

export const Button: React.FC<ButtonProps> = () => {
  return <ButtonContainer type="submit" />;
};
