import React from "react";
import styled from "styled-components";
import { LargeLabel } from "../FormElements/Label";

const LargeHeader = styled.h1`
  font-size: 3rem;
`;

interface ThankYouProps {}

export const ThankYou: React.FC<ThankYouProps> = () => {
  return (
    <div>
      <LargeHeader>Thank You!</LargeHeader>
      <LargeLabel>
        Call Mathnasium of New Tampa at 813-644-7282 if you have any questions.
      </LargeLabel>
    </div>
  );
};
