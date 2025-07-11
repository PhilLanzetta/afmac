import React, { useState } from "react"
import { graphql } from "gatsby"
import { Fade } from "react-awesome-reveal"
import * as styles from "../components/journalEntry.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import VideoPlayer from "../components/videoPlayer"
import Seo from "../components/seo"

const Supplemental = ({ location, data }) => {
  const [activeVideo, setActiveVideo] = useState(null)
  const { title, supplementalLocation, content, date } =
    data.contentfulSupplementalContent
  return (
    <>
      <div className={styles.journalMain}>
        <Fade triggerOnce={true}>
          <h1 className="heading center">{title}</h1>
          <p className="center">{supplementalLocation}</p>
        </Fade>
        <Fade triggerOnce={true}>
          <p className={`center ${styles.date}`}>
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
              timeZone: "Europe/London",
            })}
          </p>
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
                  className={
                    item.caption
                      ? styles.imageModuleWithCaption
                      : styles.imageModule
                  }
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
    </>
  )
}

export const query = graphql`
  query getSingleSupplemental($slug: String) {
    contentfulSupplementalContent(slug: { eq: $slug }) {
      title
      supplementalLocation: location
      content {
        ... on ContentfulImageModule {
          imageId: id
          caption {
            childMarkdownRemark {
              html
            }
          }
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
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
      }
      date
    }
  }
`
export const Head = ({data}) => <Seo title={data.contentfulSupplementalContent.title} />

export default Supplemental
