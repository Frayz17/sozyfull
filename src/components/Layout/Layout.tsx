import React from "react";
import { Props } from "./types";
import css from "./styles.module.css";

const Layout: React.FC<Props> = ({ children, header, mobileNav }) => (
  <>
    <header className={css.mainHeader}>{header}</header>
    {mobileNav}
    <main className={css.content}>{children}</main>
  </>
);

export default Layout;
