import React from "react"
import { Link } from "gatsby"
import * as styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <Link to="/" className={styles.footerLogo}>
          African Film and <br />
          Media Arts Collective
        </Link>
        <div className={styles.footerLinkContainer}>
          <div className={styles.footerColumn}>
            <Link to="/contact" className={styles.footerUpper}>
              About
            </Link>
            <Link to="/search" className={styles.footerUpper}>
              Search
            </Link>
          </div>
          <div className={styles.footerColumn}>
            <p className={styles.footerUpper}>Contact</p>
            <a href="mailto:sampleemail@gmail.com">Email</a>
          </div>
          <div className={styles.footerColumn}>
            <p className={styles.footerUpper}>Socials</p>
            <a
              href="https://instagram.com/handle"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/handle"
              target="_blank"
              rel="noreferrer"
            >
              Youtube
            </a>
            <a href="https://vimeo.com/handle" target="_blank" rel="noreferrer">
              Vimeo
            </a>
          </div>
          <div className={styles.footerColumn}>
            <p className={styles.footerUpper}>BMW Group</p>
            <a
              href="https://google.com"
              target="_blank"
              rel="noreferrer"
              className={styles.footerBelowMargin}
            >
              Visit Website
            </a>
            <p>BMW Art Car</p>
            <a
              href="https://google.com"
              target="_blank"
              rel="noreferrer"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
