import axios from "axios";
import { useForm } from "react-hook-form";
import { emailAddressRegEx, scriptURL } from "../../config";
import { MainForm } from "../../types/mainForm";
import { Error } from "../FormElements/Error";
import { Input } from "../FormElements/Input";

import "./mainForm.css";

export default function Form() {
  const { register, handleSubmit, formState } = useForm<MainForm>();

  const { errors } = formState;

  const onSubmit = async (data: MainForm) => {
    console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] data", data);
    const form = new FormData();
    form.append("firstName", data.firstName);
    form.append("lastName", data.lastName);

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

    // fetch(scriptURL, { method: "POST", body: new FormData(data) })
    //   .then((resp) => {
    //     console.log("\x1b[42m%s \x1b[0m", "FIXME: [matt] resp", resp);
    //   })
    //   .catch((err) => {
    //     console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] err", err);
    //   });
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
      <label>Phone number</label>
      <input
        type="tel"
        {...register("phoneNumber", {
          required: true,
          maxLength: 11,
          minLength: 8,
        })}
      />
      <input type="submit" />
    </form>
  );
}
