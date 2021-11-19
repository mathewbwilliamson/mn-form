import { useForm } from "react-hook-form";

// import "./styles.css";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
        type="text"
        {...register("First Name", { required: true, maxLength: 80 })}
      />
      {errors["First Name"]?.type === "required" && "First Name is required"}

      <label>Last Name</label>
      <input
        type="text"
        {...register("Last Name", { required: true, maxLength: 100 })}
      />
      {errors["Last Name"]?.type === "required" && "Last Name is required"}

      <label>Email</label>
      <input
        type="text"
        {...register("Email", {
          required: true,
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      <label>Mobile number</label>
      <input
        type="tel"
        {...register("Mobile number", {
          required: true,
          maxLength: 11,
          minLength: 8,
        })}
      />
      {/* <label>Title</label> */}
      {/* <select
        {...register("Name", {
          required: true,
        })}
      >
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>
      <label>Are you a developer?</label>
      <input
        type="radio"
        value="Yes"
        {...register("developer", { required: true })}
      />
      <input
        type="radio"
        value="No"
        {...register("developer", { required: true })}
      /> */}

      <input type="submit" />
    </form>
  );
}
