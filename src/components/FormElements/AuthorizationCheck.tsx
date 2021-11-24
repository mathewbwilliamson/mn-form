import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { MainForm } from "../../types/mainForm";
import { Error } from "../FormElements/Error";

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
    <div>
      <input
        type="checkbox"
        {...register("authorization", { required: true })}
      />
      <label>
        I authorize Mathnasium® to charge this credit card per our Membership
        Agreement on file.
      </label>
      <Error
        errors={errors}
        name="authorization"
        label="Authorization"
        customErrorMessage="You must give authorization to use this credit card"
      />
    </div>
  );
};
