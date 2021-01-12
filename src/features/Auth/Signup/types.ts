import { FormEvent } from "react";
import { Input } from "../authTypes";

export interface signUpState {
  signupForm: {
    email: Input;
    password: Input;
    name: Input;
  };
}

export interface Props {
  onSignup: (event: FormEvent<HTMLFormElement>, loginData: signUpState) => void;
  loading: boolean;
}
