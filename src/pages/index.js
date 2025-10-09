import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { AnimatePresence, motion } from "motion/react"
import Loader from "../components/loader"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import VideoPlayer from "../components/videoPlayer"
import ConvertKit from "convertkit-react"
import useWindowSize from "../utils/useWindowSize"
import { GatsbyImage } from "gatsby-plugin-image"
import slugify from "slugify"

const Index = ({ location, data }) => {
  const confirmed = location.hash === "#confirmed"
  // const [loading, setLoading] = useState(confirmed ? false : true)
  const [activeVideo, setActiveVideo] = useState(null)
  const [heroImage, setHeroImage] = useState(null)
  const {
    homeVideo,
    homeVideoMobile,
    workshopTable,
    upcomingEvents,
    aboutHeroText,
  } = data.contentfulHomePage

  const workshops = data.allContentfulWorkshopEntry.nodes

  const collective = data.contentfulCollectivePage.collective

  const leadership = data.contentfulAboutPage.leadership

  const { width, height } = useWindowSize()

  const isMobile = height > width

  // useEffect(() => {
  //   const body = document.body
  //   if (loading === true) {
  //     body.style.position = 'fixed'
  //   } else {
  //     body.style.position = ''
  //   }
  // }, [loading])

  // useEffect(() => {
  //   if (localStorage.getItem('intro')) {
  //     setLoading(false)
  //   }
  // }, [])

  useEffect(() => {
    document.getElementById("ck-first-name").required = true
    document.getElementById("ck-email").required = true
  }, [])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     localStorage.setItem('intro', 'true')
  //     setLoading(false)
  //   }, 2000)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [])

  return (
    <>
      {/* <AnimatePresence>
        {loading && (
          <motion.div
            intial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key='loader'
          >
            <Loader></Loader>
          </motion.div>
        )}
      </AnimatePresence> */}
      <div className={styles.indexMain}>
        <div className={styles.homeVideo}>
          <VideoPlayer
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            video={isMobile ? homeVideoMobile : homeVideo}
            videoId={isMobile ? homeVideoMobile.id : homeVideo.id}
            isHome={true}
          ></VideoPlayer>
        </div>
        {aboutHeroText && (
          <Fade triggerOnce={true}>
            <div className={styles.aboutHeroText}>
              <div
                dangerouslySetInnerHTML={{
                  __html: aboutHeroText.childMarkdownRemark.html,
                }}
                className={styles.aboutText}
              ></div>
              <Link to="/about" className={styles.aboutBtn}>
                Learn more
              </Link>
            </div>
          </Fade>
        )}
        <Fade triggerOnce={true}>
          <div className={styles.workshopCard}>
            <h2 className="heading">Workshops</h2>
            <div className={styles.table}>
              {workshopTable.map((item, index) => (
                <div key={index} className={styles.row}>
                  <Fade triggerOnce={true}>
                    <p className={styles.date}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                        timeZone: "Europe/London",
                      })}
                    </p>
                    <div className={styles.rowTitle}>
                      <p className={styles.chapter}>{item.chapter}</p>
                      <p className={styles.dash}>—</p>
                      <p className={styles.location}>{item.location}</p>
                    </div>
                    <p
                      className={`${styles.status} ${
                        item.status === "Completed" ? styles.completed : ""
                      }`}
                    >
                      {item.status}
                    </p>
                  </Fade>
                </div>
              ))}
            </div>
          </div>
        </Fade>
        <Fade triggerOnce={true}>
          <div className={styles.upcomingContainer}>
            <h2 className="heading">News</h2>
            <div className={styles.upcomingGrid}>
              {upcomingEvents.map(event => (
                <a
                  href={event.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  key={event.id}
                >
                  <Fade triggerOnce={true}>
                    {event.image && (
                      <div className={styles.upcomingImageContainer}>
                        <GatsbyImage
                          image={event.image.gatsbyImageData}
                          alt={event.image.description}
                          className={styles.upcomingImage}
                        ></GatsbyImage>
                      </div>
                    )}
                    <p>{event.title}</p>
                    <p className={styles.upcomingDates}>{event.dates}</p>
                  </Fade>
                </a>
              ))}
            </div>
          </div>
        </Fade>
        <Fade triggerOnce={true}>
          <div className={styles.journalContainer}>
            <h2 className="heading">Journal</h2>
            <div className={styles.workshopsContainer}>
              {workshops.map((entry, index) => (
                <Link
                  key={index}
                  to={`/journal/${entry.slug}`}
                  className={styles.multipleHighlightContainer}
                >
                  <Fade triggerOnce={true}>
                    {entry.tileImage && (
                      <GatsbyImage
                        image={entry.tileImage.gatsbyImageData}
                        alt={entry.tileImage.description}
                        className={styles.workshopImage}
                      ></GatsbyImage>
                    )}
                    <p>{entry.tileTitle}</p>
                  </Fade>
                </Link>
              ))}
            </div>
          </div>
        </Fade>
        <Fade triggerOnce={true}>
          <div className={styles.journalContainer}>
            <h2 className="heading">Collective</h2>
            <div className={styles.collectiveHeader}>
              {leadership.map((member, index) => (
                <a
                  href={`/about/#${slugify(member.name, { lower: true })}`}
                  key={index}
                  className={styles.headerAnchor}
                  onMouseEnter={
                    width > 920 ? () => setHeroImage(member.headshot) : null
                  }
                >
                  {member.name}
                </a>
              ))}
              {collective.map((member, index) => (
                <a
                  href={`/collective/#${slugify(member.name, { lower: true })}`}
                  key={index}
                  className={styles.headerAnchor}
                  onMouseEnter={
                    width > 920 ? () => setHeroImage(member.headshot) : null
                  }
                >
                  {member.name}
                </a>
              ))}
              <AnimatePresence>
                {heroImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={heroImage.id}
                    className={styles.heroImage}
                  >
                    <GatsbyImage
                      image={heroImage.gatsbyImageData}
                      alt={heroImage.description}
                    ></GatsbyImage>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Fade>
        <div className={styles.emailSignUp} id="confirmed">
          <p className={styles.emailHeading}>
            {confirmed ? "Thank You" : "Join the Journey"}
          </p>
          <ConvertKit
            formId={process.env.GATSBY_FORM_ID}
            className={confirmed ? styles.emailFormConfirmed : styles.emailForm}
            namePlaceholder="Name"
            emailPlaceholder="Email"
            submitText=" →"
          />
          {confirmed && (
            <p className={styles.confirmSubtext}>
              Please check your email to confirm your subscription.
            </p>
          )}
        </div>
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
      homeVideoMobile {
        aspectRatio
        id
        videoLink
        posterImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      aboutHeroText {
        childMarkdownRemark {
          html
        }
      }
      workshopDescription {
        childMarkdownRemark {
          html
        }
      }
      upcomingEvents {
        id
        title
        image {
          description
          gatsbyImageData
        }
        dates
        linkUrl
      }
      workshopTable {
        chapter
        date
        location
        status
      }
    }
    allContentfulWorkshopEntry(
      sort: { date: ASC }
      filter: { title: { ne: "Placeholder (do not delete)" } }
    ) {
      nodes {
        id
        location
        slug
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        tileTitle
        metadata {
          tags {
            id
            name
          }
        }
        introText {
          childMarkdownRemark {
            excerpt(format: HTML, pruneLength: 250)
          }
        }
      }
    }
    contentfulCollectivePage {
      collective {
        id
        headshot {
          id
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        name
      }
    }
    contentfulAboutPage {
      leadership {
        name
        headshot {
          gatsbyImageData
          description
        }
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default Index
