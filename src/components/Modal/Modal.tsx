import React from "react";
import ReactDOM from "react-dom";
import { Props } from "./types";
import Button from "components/Button";
import css from "./styles.module.css";

const Modal: React.FC<Props> = ({
  title,
  onCancelModal,
  onAcceptModal,
  acceptEnabled,
  isLoading,
  children,
}) =>
  ReactDOM.createPortal(
    <div className={css.root}>
      <header className={css.header}>
        <h1>{title}</h1>
      </header>
      <div className={css.content}>{children}</div>
      <div className={css.actions}>
        <Button design="danger" mode="flat" onClick={onCancelModal}>
          Cancel
        </Button>
        <Button
          mode="raised"
          onClick={onAcceptModal}
          disabled={!acceptEnabled}
          loading={isLoading}
        >
          Accept
        </Button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );

export default Modal;
