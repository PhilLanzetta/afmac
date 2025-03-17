import React from "react"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, children }) => {
  const isJournal = location?.pathname.includes('journal')
  return (
    <>
      <Header textColor={isJournal ? "#000" : "#fff"}></Header>
      {children}
      <Footer></Footer>
    </>
  )
}

export default Layout
