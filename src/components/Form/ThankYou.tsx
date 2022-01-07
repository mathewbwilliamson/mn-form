import React from "react";
import styled from "styled-components";
import { LargeLabel } from "../FormElements/Label";

const LargeHeader = styled.h1`
  font-size: 3rem;
`;

const ThankYouContainer = styled.div`
  margin-bottom: 21px;
`;
interface ThankYouProps {}

export const ThankYou: React.FC<ThankYouProps> = () => {
  return (
    <ThankYouContainer>
      <LargeHeader>Thank You!</LargeHeader>
      <LargeLabel>
        Call Mathnasium of New Tampa at 813-644-7282 if you have any questions.
      </LargeLabel>
    </ThankYouContainer>
  );
};
