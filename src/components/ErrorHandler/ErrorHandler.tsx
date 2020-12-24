import React from "react";
import { Props } from "./types";
import Backdrop from "components/Backdrop";
import Modal from "components/Modal";

const ErrorHandler: React.FC<Props> = ({ error, onHandle }) => (
  <>
    {error && <Backdrop onClick={onHandle} />}
    {error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={onHandle}
        onAcceptModal={onHandle}
        acceptEnabled
      >
        <p>{error.message}</p>
      </Modal>
    )}
  </>
);

export default ErrorHandler;
