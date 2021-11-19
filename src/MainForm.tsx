import { useForm } from "react-hook-form";
import { Error } from "./Error";

import "./mainForm.css";

export default function Form() {
  const { register, handleSubmit, formState } = useForm<any, any>();

  const { errors } = formState;

  const onSubmit = (data: any) => {
    console.log("\x1b[41m%s \x1b[0m", "FIXME: [matt] data", data);
    console.log(
      "\x1b[42m%s \x1b[0m",
      "FIXME: [matt] JSON.stringify(data)",
      JSON.stringify(data)
    );
  };

  console.log("ERRORS", errors);
  console.log("\x1b[43m%s \x1b[0m", "FIXME: [matt] formState", formState);

  return (
    <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
        type="text"
        {...register("firstName", { required: true, maxLength: 80 })}
      />
      <Error errors={errors} name="firstName" label="First Name" />

      <label>Last Name</label>
      <input
        type="text"
        {...register("lastName", { required: true, maxLength: 80 })}
      />
      <Error errors={errors} name="lastName" label="Last Name" />

      <label>Email</label>
      <input
        type="text"
        {...register("email", {
          required: true,
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      <Error errors={errors} name="email" label="Email" />

      <label>Mobile number</label>
      <input
        type="tel"
        {...register("Mobile number", {
          required: true,
          maxLength: 11,
          minLength: 8,
        })}
      />

      <input type="submit" />
    </form>
  );
}
