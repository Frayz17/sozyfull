import React from "react";
import css from "./styles.module.css";

const Toolbar: React.FC = ({ children }) => (
  <div className={css.toolbar}>{children}</div>
);

export default Toolbar;
