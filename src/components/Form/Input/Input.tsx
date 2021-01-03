import React from "react";
import { Props } from "./types";
import css from "./styles.module.css";
import classnames from "classnames";

const Input: React.FC<Props> = ({
  id,
  type = "input",
  onChange,
  onBlur,
  touched,
  valid,
  label,
  control,
  placeholder,
  required,
  rows,
  value,
}) => (
  <div className="input">
    {label && <label htmlFor={id}>{label}</label>}
    {control === "input" && (
      <input
        className={classnames({
          [css.invalid]: !valid,
          [css.valid]: valid,
          [css.touched]: touched,
          [css.untouched]: !touched,
        })}
        type={type}
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
      />
    )}
    {control === "textarea" && (
      <textarea
        className={[
          !valid ? "invalid" : "valid",
          touched ? "touched" : "untouched",
        ].join(" ")}
        id={id}
        rows={rows}
        required={required}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
      />
    )}
  </div>
);

export default Input;
