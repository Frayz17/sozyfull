import React from "react";
import { Link } from "react-router-dom";
import { Props } from "./types";
import classnames from "classnames";
import css from "./styles.module.css";

const Button: React.FC<Props> = ({
  link,
  design,
  mode,
  onClick,
  disabled,
  loading,
  type,
  children,
}) =>
  !link ? (
    <button
      className={classnames(css.button, {
        [css[`button--${design}`]]: !!design,
        [css[`button--${mode}`]]: !!mode,
      })}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? "Loading..." : children}
    </button>
  ) : (
    <Link
      className={classnames(css.button, {
        [css[`button--${design}`]]: !!design,
        [css[`button--${mode}`]]: !!mode,
      })}
      to={link}
    >
      {children}
    </Link>
  );

export default Button;
