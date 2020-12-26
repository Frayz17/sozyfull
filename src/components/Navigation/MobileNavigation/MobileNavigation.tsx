import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import { Props } from "./types";
import classnames from "classnames";
import css from "./styles.module.css";

const MobileNavigation: React.FC<Props> = ({
  mobile,
  isAuth,
  onLogout,
  onChooseItem,
  open,
}) => (
  <nav className={classnames(css.mobileNav, { [css.open]: !!open })}>
    <ul
      className={classnames(css.mobileNav__items, { [css.mobile]: !!mobile })}
    >
      <NavigationItems
        mobile
        onChoose={onChooseItem}
        isAuth={isAuth}
        onLogout={onLogout}
      />
    </ul>
  </nav>
);

export default MobileNavigation;
