import React, { useState } from "react";
import Input from "components/Form/Input/Input";
import Button from "components/Button/Button";
import { required, length, email } from "utils/validators";
import Auth from "../Auth";
import { Props, signUpState } from "./types";

const initialState = {
  signupForm: {
    email: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, email],
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
    name: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
  },
};

const Signup: React.FC<Props> = ({ onSignup, loading }) => {
  const [state, setState] = useState(initialState as signUpState);
  const [formIsValid, setFormIsvalid] = useState(false);

  const inputChangeHandler = (
    input: "email" | "password" | "name",
    value: string
  ) => {
    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState,
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value,
        },
      };

      return updatedForm;
    });
    let formIsValid = true;
    formIsValid = formIsValid && state.signupForm.email.valid;
    formIsValid = formIsValid && state.signupForm.name.valid;
    formIsValid = formIsValid && state.signupForm.password.valid;
    setFormIsvalid(formIsValid);
  };

  const inputBlurHandler = (input: "email" | "password" | "name") => () => {
    setState((prevState) => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };

  return (
    <Auth>
      <form onSubmit={(e) => onSignup(e, state)}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler("email")}
          value={state.signupForm["email"].value}
          valid={state.signupForm["email"].valid}
          touched={state.signupForm["email"].touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler("name")}
          value={state.signupForm["name"].value}
          valid={state.signupForm["name"].valid}
          touched={state.signupForm["name"].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler("password")}
          value={state.signupForm["password"].value}
          valid={state.signupForm["password"].valid}
          touched={state.signupForm["password"].touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Signup
        </Button>
      </form>
    </Auth>
  );
};

export default Signup;
