import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { emailAddressRegEx, scriptURL } from "../../config";
import { sendEmail } from "../../services/emailService";
import { MainForm } from "../../types/mainForm";
import { AuthorizationCheck } from "../FormElements/AuthorizationCheck";
import { Button } from "../FormElements/Button";
import { Input } from "../FormElements/Input";
import { LargeLabel } from "../FormElements/Label";
import { StateSelect } from "../FormElements/StateSelect";
import "./mainForm.css";
import { createFormFromData } from "./mainFormUtils";
import { ThankYou } from "./ThankYou";

const GroupedFieldsWithLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupedFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const GroupedFieldSpacing = styled.div`
  width: 40px;
`;

const Callout = styled.div`
  background-color: pink;
  width: calc(100% - 40px);
  padding: 20px;
  margin: 20px 0;
`;

export default function Form() {
  const { register, handleSubmit, formState } = useForm<MainForm>();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSubmitErrored, setIsSubmitErrored] = React.useState<boolean>(false);
  const [isSubmitComplete, setIsSubmitComplete] =
    React.useState<boolean>(false);

  const { errors } = formState;

  const onSubmit = async (data: MainForm) => {
    setIsSubmitting(true);
    const form = createFormFromData(data);

    try {
      await axios({
        method: "post",
        url: scriptURL,
        headers: { "Content-Type": "multipart/form-data" },
        data: form,
      });

      const parentName = `${data.firstName} ${data.lastName}`;

      await sendEmail(parentName);

      setIsSubmitComplete(true);
    } catch (e) {
      console.log("\x1b[41m%s \x1b[0m", "The error is", e);
      setIsSubmitErrored(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSubmitting && !isSubmitErrored && !!isSubmitComplete) {
    return <ThankYou />;
  }

  return (
    <form
      name="submit-to-google-sheet"
      className="main-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!isSubmitErrored && (
        <Callout>
          There was an error submitting the form. <br />
          Please contact Mathnasium of New Tampa at 813-644-7282.
        </Callout>
      )}
      <Input
        name="childsName"
        label="Child(s) Name (separate by comma for multiple children)"
        errors={errors}
        register={register}
        validations={{ required: true }}
        customErrorMessage="Child(s) Name is required"
      />

      <Input
        name="guardianEmailAddress"
        label="Guardian Email Address"
        errors={errors}
        register={register}
        validations={{ required: true, pattern: emailAddressRegEx }}
        customErrorMessage="Please enter a valid email address"
      />

      <GroupedFieldsWithLabel>
        <LargeLabel>Credit Card Information</LargeLabel>
        <GroupedFields>
          <Input
            name="firstName"
            label="First Name"
            errors={errors}
            register={register}
            validations={{ required: true, maxLength: 80 }}
          />
          <GroupedFieldSpacing />
          <Input
            name="lastName"
            label="Last Name"
            errors={errors}
            register={register}
            validations={{ required: true, maxLength: 80 }}
          />
        </GroupedFields>
      </GroupedFieldsWithLabel>
      <Input
        name="creditCardNumber"
        label="Credit Card Number"
        register={register}
        errors={errors}
        validations={{
          required: true,
          minLength: 13,
          maxLength: 16,
          pattern: /[0-9]+/,
        }}
        customErrorMessage="Please enter a valid credit card number"
      />
      <GroupedFields>
        <Input
          name="expirationDate"
          label="Expiration Date (mm/yy)"
          register={register}
          errors={errors}
          validations={{
            required: true,
            pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
          }}
          customErrorMessage="Please enter a valid expiration date"
        />
        <GroupedFieldSpacing />
        <Input
          name="cvv"
          label="CVV (3 or 4 Digits on Back or Front of Card)"
          register={register}
          errors={errors}
          validations={{
            required: true,
            pattern: /^[0-9]{3,4}$/,
          }}
          customErrorMessage="Please enter a valid CVV"
        />
      </GroupedFields>

      <LargeLabel>Billing Address</LargeLabel>
      <Input
        name="billingAddressStreet"
        label="Street"
        register={register}
        errors={errors}
        validations={{
          required: true,
        }}
      />
      <GroupedFields>
        <Input
          name="billingAddressCity"
          label="City"
          register={register}
          errors={errors}
          validations={{
            required: true,
            maxLength: 80,
          }}
        />
        <GroupedFieldSpacing />
        <StateSelect errors={errors} register={register} />
        <GroupedFieldSpacing />
        <Input
          name="billingAddressZipCode"
          label="Zip Code"
          register={register}
          errors={errors}
          validations={{
            required: true,
            pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
          }}
          customErrorMessage="Please enter a valid zip code"
        />
      </GroupedFields>

      <AuthorizationCheck errors={errors} register={register} />

      <Button isDisabled={isSubmitting} />
    </form>
  );
}
