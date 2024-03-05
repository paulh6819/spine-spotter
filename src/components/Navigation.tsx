import React from "react";

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="menu">
        <li>
          <a className="menu-category" href="/about">
            About
          </a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/sign-up">Sign up</a>
        </li>
        <li id="login-button">
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
