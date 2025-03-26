import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { AnimatePresence, motion } from "motion/react"
import Loader from "../components/loader"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import VideoPlayer from "../components/videoPlayer"
import ConvertKit from "convertkit-react"

const Index = ({ location, data }) => {
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState(null)
  const { homeVideo, workshopDescription, workshopTable } =
    data.contentfulHomePage

  useEffect(() => {
    const body = document.body
    if (loading === true) {
      body.style.position = "fixed"
    } else {
      body.style.position = ""
    }
  }, [loading])

  useEffect(() => {
    if (sessionStorage.getItem("intro")) {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.getElementById("ck-first-name").required = true
    document.getElementById("ck-email").required = true
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.setItem("intro", "true")
      setLoading(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            intial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="loader"
          >
            <Loader></Loader>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.indexMain}>
        <div className={styles.homeVideo}>
          <VideoPlayer
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            video={homeVideo}
            videoId={homeVideo.id}
          ></VideoPlayer>
        </div>
        <Fade triggerOnce={true}>
          <div className={styles.workshopCard}>
            <h2 className="heading">Workshops</h2>
            <div className={styles.workshopInfoContainer}>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: workshopDescription.childMarkdownRemark.html,
                  }}
                ></div>
                <div className={styles.emailSignUp}>
                  <p className={styles.emailHeading}>Join the Journey</p>
                  <ConvertKit
                    formId={process.env.GATSBY_FORM_ID}
                    className={styles.emailForm}
                    namePlaceholder="Name"
                    emailPlaceholder="Email"
                    submitText=" →"
                  />
                </div>
              </div>
              <div>
                <div className={styles.table}>
                  {workshopTable.map((item, index) => (
                    <div key={index} className={styles.row}>
                      <p className={styles.chapter}>{item.chapter}</p>
                      <p className={styles.location}>{item.location}</p>
                      <p className={styles.date}>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
                <Link to="/journal" className={styles.readLink}>
                  Read the Journal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  )
}

export const query = graphql`
  query {
    contentfulHomePage {
      homeVideo {
        aspectRatio
        id
        videoLink
        posterImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      workshopDescription {
        childMarkdownRemark {
          html
        }
      }
      workshopTable {
        chapter
        date
        location
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default Index
