import React from "react";
import { Props } from "./types";
import css from "./styles.module.css";

const Image: React.FC<Props> = ({ imageUrl, contain, children, left }) => (
  <div
    className={css.image}
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: contain ? "contain" : "cover",
      backgroundPosition: left ? "left" : "center",
    }}
  />
);

export default Image;
