import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Fade } from "react-awesome-reveal"
import * as styles from "../components/journalEntry.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import VideoPlayer from "../components/videoPlayer"

const Workshop = ({ location, data }) => {
  const [activeVideo, setActiveVideo] = useState(null)
  const {
    title,
    workshopLocation,
    relatedContent,
    introText,
    content,
    date,
    tileImage,
  } = data.contentfulWorkshopEntry
  return (
    <>
      <div className={styles.journalMain}>
        <Fade triggerOnce={true}>
          <h1 className="heading center">{title}</h1>
          <p className="center">{workshopLocation}</p>
        </Fade>
        <Fade triggerOnce={true}>
          <GatsbyImage
            image={tileImage.gatsbyImageData}
            alt={tileImage.description}
            className={styles.headerImage}
          ></GatsbyImage>
        </Fade>
        <Fade triggerOnce={true}>
          <p className={`center ${styles.date}`}>
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </Fade>
        <Fade triggerOnce={true}>
          <div
            dangerouslySetInnerHTML={{
              __html: introText.childMarkdownRemark.html,
            }}
            className={styles.textModule}
          ></div>
        </Fade>
        {content.map(item => {
          if (item.textId) {
            return (
              <Fade triggerOnce={true} key={item.textId}>
                <div
                  className={styles.textModule}
                  dangerouslySetInnerHTML={{
                    __html: item.text.childMarkdownRemark.html,
                  }}
                ></div>
              </Fade>
            )
          } else if (item.imageId) {
            return (
              <Fade triggerOnce={true} key={item.imageId}>
                <GatsbyImage
                  className={item.caption ? styles.imageModuleWithCaption : styles.imageModule}
                  image={item.image.gatsbyImageData}
                  alt={item.image.description}
                ></GatsbyImage>
                {item.caption && (
                  <div
                    className={styles.imageModuleCaption}
                    dangerouslySetInnerHTML={{
                      __html: item.caption.childMarkdownRemark.html,
                    }}
                  ></div>
                )}
              </Fade>
            )
          } else if (item.videoId) {
            return (
              <div className={styles.videoContainer} key={item.videoId}>
                <VideoPlayer
                  video={item}
                  videoId={item.videoId}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                ></VideoPlayer>
              </div>
            )
          } else {
            return <div>Unknown Content</div>
          }
        })}
      </div>
      {relatedContent && (
        <div className={styles.relatedContainer}>
          <Fade triggerOnce={true}>
            <h2 className={styles.related}>Related</h2>
            {relatedContent.map((item, index) => (
              <Link
                key={index}
                className={styles.supplementalTile}
                to={`/journal/${item.slug}`}
              ></Link>
            ))}
          </Fade>
        </div>
      )}
    </>
  )
}

export const query = graphql`
  query getSingleWorkshop($slug: String) {
    contentfulWorkshopEntry(slug: { eq: $slug }) {
      title
      workshopLocation: location
      introText {
        childMarkdownRemark {
          html
        }
      }
      content {
        ... on ContentfulImageModule {
          imageId: id
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
          caption {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulTextModule {
          textId: id
          text {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulVideoModule {
          videoId: id
          posterImage {
            description
            gatsbyImageData
          }
          videoLink
        }
      }
      date
      tileImage {
        description
        gatsbyImageData
      }
    }
  }
`

export default Workshop
