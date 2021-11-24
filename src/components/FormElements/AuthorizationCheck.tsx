import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { MainForm } from "../../types/mainForm";
import { Error } from "../FormElements/Error";
import { Label } from "./Label";

const AuthorizationCheckContainer = styled.div`
  text-align: left;
  margin: 1rem 0;
`;
interface AuthorizationCheckProps {
  errors: any;
  register: UseFormRegister<any>;
  validations?: RegisterOptions<MainForm>;
}

export const AuthorizationCheck: React.FC<AuthorizationCheckProps> = ({
  register,
  errors,
}) => {
  return (
    <AuthorizationCheckContainer>
      <input
        type="checkbox"
        {...register("authorization", { required: true })}
      />
      <Label>
        I authorize Mathnasium® to charge this credit card per our Membership
        Agreement on file.
      </Label>
      <Error
        errors={errors}
        name="authorization"
        label="Authorization"
        customErrorMessage="You must give authorization to use this credit card"
      />
    </AuthorizationCheckContainer>
  );
};
