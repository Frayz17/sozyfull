import React from "react";
import ReactDOM from "react-dom";
import { Props } from "./types";
import css from "./styles.module.css";

const Backdrop: React.FC<Props> = ({ open, onClick }) =>
  ReactDOM.createPortal(
    <div
      className={[css.root, open ? "open" : ""].join(" ")}
      onClick={onClick}
    />,
    document.getElementById("backdrop-root")!
  );

export default Backdrop;
