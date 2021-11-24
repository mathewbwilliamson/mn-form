import axios from "axios";
import { useForm } from "react-hook-form";
import { emailAddressRegEx, scriptURL } from "../../config";
import { MainForm } from "../../types/mainForm";
import { AuthorizationCheck } from "../FormElements/AuthorizationCheck";
import { Error } from "../FormElements/Error";
import { Input } from "../FormElements/Input";
import { StateSelect } from "../FormElements/StateSelect";

import "./mainForm.css";
import { createFormFromData } from "./mainFormUtils";

export default function Form() {
  const { register, handleSubmit, formState } = useForm<MainForm>();

  const { errors } = formState;

  const onSubmit = async (data: MainForm) => {
    console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] data", data);
    const form = createFormFromData(data);

    try {
      const req = await axios({
        method: "post",
        url: scriptURL,
        headers: { "Content-Type": "multipart/form-data" },
        data: form,
      });
      console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] req", req);
    } catch (e) {
      console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] e", e);
    }
  };

  console.log("ERRORS", errors);
  console.log("\x1b[43m%s \x1b[0m", "FIXME: [matt] formState", formState);

  return (
    <form
      name="submit-to-google-sheet"
      className="main-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Child(s) Name (separate by comma for multiple children)</label>
      <input type="text" {...register("childsName", { required: true })} />
      <Error errors={errors} name="childsName" label="Child(s) Name" />
      <Input
        name="guardianEmailAddress"
        label="Guardian Email Address"
        errors={errors}
        register={register}
        validations={{ required: true, pattern: emailAddressRegEx }}
        customErrorMessage="Please enter a valid email address"
      />

      <div className="main-form__grouped-fields">
        <label>Cardholder Name</label>
        <Input
          name="firstName"
          label="First Name"
          errors={errors}
          register={register}
          validations={{ required: true, maxLength: 80 }}
        />
        <Input
          name="lastName"
          label="Last Name"
          errors={errors}
          register={register}
          validations={{ required: true, maxLength: 80 }}
        />
      </div>
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
      <div className="main-form__grouped-fields">
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
        <Input
          name="cvv"
          label="CVV (3 or 4 Digits on Back of Card)"
          register={register}
          errors={errors}
          validations={{
            required: true,
            pattern: /^[0-9]{3,4}$/,
          }}
          customErrorMessage="Please enter a valid CVV"
        />
      </div>

      <label>Billing Address</label>
      <Input
        name="billingAddressStreet"
        label="Street"
        register={register}
        errors={errors}
        validations={{
          required: true,
        }}
      />
      <div className="main-form__grouped-fields">
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

        <StateSelect errors={errors} register={register} />
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
      </div>

      <AuthorizationCheck errors={errors} register={register} />

      <input type="submit" />
    </form>
  );
}
