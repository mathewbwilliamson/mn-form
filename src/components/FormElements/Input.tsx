import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { MainForm } from "../../types/mainForm";
import { Error } from "../FormElements/Error";
import { Label } from "./Label";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
  width: 100%;
`;

const MainInput = styled.input`
  height: 1.6rem;
`;

interface InputProps {
  name: keyof MainForm;
  label: string;
  errors: any;
  register: UseFormRegister<any>;
  validations?: RegisterOptions<MainForm>;
  customErrorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  errors,
  register,
  validations = {},
  customErrorMessage,
}) => {
  return (
    <InputContainer className="input__container">
      <Label>{label}</Label>
      <MainInput type="text" {...register(`${name}`, validations)} />
      <Error
        errors={errors}
        name={name}
        label={label}
        customErrorMessage={customErrorMessage}
      />
    </InputContainer>
  );
};
