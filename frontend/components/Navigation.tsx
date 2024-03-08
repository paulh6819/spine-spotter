import React from "react";
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/sign-up">Sign up</a>
        </li>
        <li className={styles["login-button"]}>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
