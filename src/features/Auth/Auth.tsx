import React from "react";
import css from "./styles.module.css";

const Auth: React.FC = ({ children }) => (
  <section className="auth-form">{children}</section>
);

export default Auth;
