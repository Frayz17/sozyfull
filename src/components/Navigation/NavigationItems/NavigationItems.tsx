import React from "react";
import { NavLink } from "react-router-dom";
import { Props } from "./types";
import classnames from "classnames";
import css from "./styles.module.css";

const navItems = [
  { id: "feed", text: "Feed", link: "/", auth: true },
  { id: "login", text: "Login", link: "/", auth: false },
  { id: "signup", text: "Signup", link: "/signup", auth: false },
];

const NavigationItems: React.FC<Props> = ({
  onLogout,
  isAuth,
  mobile,
  onChoose,
}) => (
  <>
    {[
      ...navItems
        .filter((item) => item.auth === isAuth)
        .map((item) => (
          <li
            key={item.id}
            className={classnames(css.navigationItem, {
              [css.mobile]: !!mobile,
            })}
          >
            <NavLink to={item.link} exact onClick={onChoose}>
              {item.text}
            </NavLink>
          </li>
        )),
      isAuth && (
        <li className={css.navigationItem} key="logout">
          <button onClick={onLogout}>Logout</button>
        </li>
      ),
    ]}
  </>
);

export default NavigationItems;
