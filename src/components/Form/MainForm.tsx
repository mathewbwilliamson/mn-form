import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { emailAddressRegEx, scriptURL } from "../../config";
import { MainForm } from "../../types/mainForm";
import { AuthorizationCheck } from "../FormElements/AuthorizationCheck";
import { Button } from "../FormElements/Button";
import { Input } from "../FormElements/Input";
import { LargeLabel } from "../FormElements/Label";
import { StateSelect } from "../FormElements/StateSelect";
import "./mainForm.css";
import { createFormFromData } from "./mainFormUtils";

const GroupedFieldsWithLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupedFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GroupedFieldSpacing = styled.div`
  width: 40px;
`;

export default function Form() {
  const { register, handleSubmit, formState } = useForm<MainForm>();

  const { errors } = formState;

  const onSubmit = async (data: MainForm) => {
    const form = createFormFromData(data);

    try {
      await axios({
        method: "post",
        url: scriptURL,
        headers: { "Content-Type": "multipart/form-data" },
        data: form,
      });
    } catch (e) {
      console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] e", e);
    }
  };

  return (
    <form
      name="submit-to-google-sheet"
      className="main-form"
      onSubmit={handleSubmit(onSubmit)}
    >
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

      <Button />
    </form>
  );
}
