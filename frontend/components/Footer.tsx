import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles["footer-content"]}>
        <span className="footer-title">SpineSpotter AI © 2022 – 2024</span>
        <a
          href="/policies"
          className={styles["footer-link"]}
          aria-label="Terms & Policies"
        >
          Design Rationale
        </a>
        <a
          href="/policies/privacy-policy"
          className={styles["footer-link"]}
          aria-label="Privacy Policy"
        >
          Privacy Policy
        </a>
        <a
          href="/brand"
          className={styles["footer-link"]}
          aria-label="Brand Guidelines"
        >
          Brand Guidelines
        </a>
      </div>
      <div className={styles["social-links"]}>
        <a
          href="https://www.instagram.com/hendos_photos/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.linkedin.com/in/paul-henderson-548747141/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["social-icon"]}
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://github.com/paulh6819"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["social-icon"]}
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
