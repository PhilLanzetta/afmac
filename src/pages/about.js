import React from "react"
import Layout from "../components/layout"
import * as styles from "../components/about.module.css"

const About = () => {
  return (
    <Layout>
      <div className={styles.aboutMain}>
        <h1 className="heading center">About</h1>
      </div>
    </Layout>
  )
}

export default About
