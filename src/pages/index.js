import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import Loader from "../components/loader"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const Index = ({ location }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const body = document.body
    body.style.position = "fixed"
    const timer = setTimeout(() => {
      body.style.position = ""
      setLoading(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Layout location={location}>
      <AnimatePresence>
        {loading && (
          <motion.div intial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Loader></Loader>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.indexMain}></div>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default Index
