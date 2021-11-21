import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { MainForm } from "../../types/mainForm";
import { Error } from "../FormElements/Error";

interface InputProps {
  name: string;
  label: string;
  errors: any;
  register: UseFormRegister<any>;
  validations?: RegisterOptions<MainForm>;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  errors,
  register,
  validations = {},
}) => {
  return (
    <>
      <label>{label}</label>
      <input type="text" {...register(`${name}`, validations)} />
      <Error errors={errors} name={name} label={label} />
    </>
  );
};
