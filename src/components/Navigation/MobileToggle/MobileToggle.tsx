import React from "react";
import { Props } from "./types";
import ccs from "./styles.module.css";

const MobileToggle: React.FC<Props> = ({ onOpen }) => (
  <button className={ccs.mobileToggle} onClick={onOpen}>
    <span className={ccs.mobileToggle__bar} />
    <span className={ccs.mobileToggle__bar} />
    <span className={ccs.mobileToggle__bar} />
  </button>
);

export default MobileToggle;
