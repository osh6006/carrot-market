import React from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

const Forms = () => {
  // LESS CODE
  // BETTER VILIDATION
  // BETTER ERROR (SET, CLEAR, DISPLAY)
  // HAVE CONTROL OVER INPUTS
  // DON'T DEAL WITH EVENT
  // EASIER INPUTS

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  // valid일 때 실행
  const onValid = (data: LoginForm) => {
    console.log("valid");
  };

  const onInvalid = (errors: any) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer then 5chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: value =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "Password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Forms;
