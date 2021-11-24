import React from "react";
import { UseFormRegister } from "react-hook-form";
import { statesList } from "../../config/statesList";

interface StateSelectProps {
  errors: any;
  register: UseFormRegister<any>;
}

export const StateSelect: React.FC<StateSelectProps> = ({
  errors,
  register,
}) => {
  return (
    <>
      <label>State</label>
      <select {...register("billingAddressState", { required: true })}>
        {statesList.map((item) => (
          <option key={item.abbreviation} value={item.abbreviation}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};
