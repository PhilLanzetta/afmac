import React from "react"
import Header from "./header"
import Footer from "./footer"
import { AnimatePresence, motion } from "framer-motion"

const Layout = ({ location, children }) => {
  const isJournal = location?.pathname.includes("journal")
  const container = {
    out: { opacity: 0, transition: { duration: 0.5 } },
    in: { opacity: 1, transition: { duration: 2 } },
    start: { opacity: 0 },
  }
  return (
    <>
      <Header journal={isJournal}></Header>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "100vh",
          width: "100vw",
          background: isJournal ? "#fff" : "#000",
          zIndex: "-1",
        }}
      ></div>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={container}
          initial="start"
          animate="in"
          exit="out"
        >
          {children}
          <Footer key="footer"></Footer>
        </motion.main>
      </AnimatePresence>
    </>
  )
}

export default Layout
