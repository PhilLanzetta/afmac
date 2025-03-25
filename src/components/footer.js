import React from "react"
import { Link } from "gatsby"
import * as styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <Link to="/" className={styles.footerLogo}>
          African Film & <br />
          Media Arts Collective
        </Link>
        <div className={styles.footerLinkContainer}>
          <div className={styles.footerColumn}>
            <Link to="/about" className={styles.footerUpper}>
              About
            </Link>
          </div>
          <div className={styles.footerColumn}>
            <p className={styles.footerUpper}>Contact</p>
            <a href="mailto:sampleemail@gmail.com">Email</a>
          </div>
          <div className={styles.footerColumn}>
            <p className={styles.footerUpper}>Social</p>
            <a
              href="https://www.instagram.com/a.f.m.a.c"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          <div className={styles.footerColumn}>
            <a
              href="https://bmwgroup.com/culture"
              target="_blank"
              rel="noreferrer"
              className={styles.footerUpper}
            >
              Supported by <br />
              BMW Culture
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
