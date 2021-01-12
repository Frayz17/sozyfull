import { FormEvent } from "react";
import { Input } from "../authTypes";

export interface LoginState {
  loginForm: {
    email: Input;
    password: Input;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Props {
  onLogin: (event: FormEvent<HTMLFormElement>, loginData: LoginData) => void;
  loading: boolean;
}
