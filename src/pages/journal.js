import React from 'react'
import Layout from '../components/layout'
import * as styles from '../components/journal.module.css'

const Journal = ({location}) => {
  return (
    <Layout location={location}><div className={styles.journalMain}><h1 className="heading center">Journal</h1></div></Layout>
  )
}

export default Journal