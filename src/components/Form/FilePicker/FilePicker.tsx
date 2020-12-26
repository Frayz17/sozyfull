import React from "react";
import { Props } from "./types";
import classnames from "classnames";
import css from "../Input/styles.module.css";

const FilePicker: React.FC<Props> = ({
  id,
  label,
  valid,
  touched,
  onBlur,
  onChange,
}) => (
  <div className="input">
    <label htmlFor={id}>{label}</label>
    <input
      className={classnames({
        [css.invalid]: !valid,
        [css.valid]: valid,
        [css.touched]: touched,
        [css.untouched]: !touched,
      })}
      type="file"
      id={id}
      onChange={(e) => onChange(id, e.target.value, e.target.files)}
      onBlur={onBlur}
    />
  </div>
);

export default FilePicker;
