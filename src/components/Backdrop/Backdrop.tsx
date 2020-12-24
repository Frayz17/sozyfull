import React from "react";
import ReactDOM from "react-dom";
import { Props } from "./types";
import classnames from "classnames";
import css from "./styles.module.css";

const Backdrop: React.FC<Props> = ({ open, onClick }) =>
  ReactDOM.createPortal(
    <div
      className={classnames([css.root, { [css.open]: open }])}
      onClick={onClick}
    />,
    document.getElementById("backdrop-root")!
  );

export default Backdrop;
