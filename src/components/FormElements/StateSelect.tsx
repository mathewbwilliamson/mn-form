import React from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { statesList } from "../../config/statesList";
import { Label } from "./Label";

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
  width: 100%;
`;

const Select = styled.select`
  height: 1.95rem;
`;
interface StateSelectProps {
  errors: any;
  register: UseFormRegister<any>;
}

export const StateSelect: React.FC<StateSelectProps> = ({
  errors,
  register,
}) => {
  return (
    <SelectContainer>
      <Label>State</Label>
      <Select {...register("billingAddressState", { required: true })}>
        {statesList.map((item) => (
          <option key={item.abbreviation} value={item.abbreviation}>
            {item.name}
          </option>
        ))}
      </Select>
    </SelectContainer>
  );
};
