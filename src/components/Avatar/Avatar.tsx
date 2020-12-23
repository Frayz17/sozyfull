import React from "react";
import { Props } from "./types";
import Image from "components/Image";
import css from "./styles.module.css";

const Avatar: React.FC<Props> = ({ imageUrl, size }) => (
  <div
    className={css.avatar}
    style={{ width: size + "rem", height: size + "rem" }}
  >
    <Image imageUrl={imageUrl} />
  </div>
);

export default Avatar;
