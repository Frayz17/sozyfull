import { FormEvent } from "react";
import { Input } from "../authTypes";

export interface SignupData {
  signupForm: {
    email: Input;
    password: Input;
    name: Input;
    formIsValid: boolean;
  };
}

export interface Props {
  onSignup: (event: FormEvent<HTMLFormElement>, loginData: SignupData) => void;
  loading: boolean;
}
