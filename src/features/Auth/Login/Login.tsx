import React, { useState } from "react";
import Input from "components/Form/Input";
import Button from "components/Button";
import { required, length, email } from "utils/validators";
import Auth from "../Auth";
import { Props, LoginState } from "./types";

const initialState = {
  loginForm: {
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
  },
};

const Login: React.FC<Props> = ({ loading, onLogin }) => {
  const [state, setState] = useState(initialState as LoginState);
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (
    input: "password" | "email",
    value: string | FileList
  ) => {
    setState(
      (prevState): LoginState => {
        let isValid = true;
        for (const validator of prevState.loginForm[input].validators) {
          isValid = isValid && validator(value);
        }

        return {
          ...prevState,
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            valid: isValid,
            value: value,
          },
        };
      }
    );

    let formIsValid = true;
    formIsValid = formIsValid && state.loginForm.email.valid;
    formIsValid = formIsValid && state.loginForm.password.valid;
    setFormIsValid(formIsValid);
  };

  const inputBlurHandler = (input: "password" | "email") => () => {
    setState((prevState) => {
      return {
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            touched: true,
          },
        },
      };
    });
  };

  return (
    <Auth>
      <form
        onSubmit={(e) =>
          onLogin(e, {
            email: state.loginForm.email.value,
            password: state.loginForm.password.value,
          })
        }
      >
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler("email")}
          value={state.loginForm["email"].value}
          valid={state.loginForm["email"].valid}
          touched={state.loginForm["email"].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler("password")}
          value={state.loginForm["password"].value}
          valid={state.loginForm["password"].valid}
          touched={state.loginForm["password"].touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Auth>
  );
};

export default Login;
