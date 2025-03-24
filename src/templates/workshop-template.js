import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
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
        <h1 className="heading center">{title}</h1>
        <p className="center">{workshopLocation}</p>
        <GatsbyImage
          image={tileImage.gatsbyImageData}
          alt={tileImage.description}
          className={styles.headerImage}
        ></GatsbyImage>
        <p className={`center ${styles.date}`}>
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: introText.childMarkdownRemark.html,
          }}
          className={styles.textModule}
        ></div>
        {content.map(item => {
          if (item.textId) {
            return (
              <div
                className={styles.textModule}
                dangerouslySetInnerHTML={{
                  __html: item.text.childMarkdownRemark.html,
                }}
              ></div>
            )
          } else if (item.imageId) {
            return (
              <GatsbyImage
                className={styles.imageModule}
                image={item.image.gatsbyImageData}
                alt={item.image.description}
              ></GatsbyImage>
            )
          } else if (item.videoId) {
            return (
              <div className={styles.videoContainer}>
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
          <h2 className={styles.related}>Related</h2>
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
      relatedContent {
        tileDisplay {
          image {
            gatsbyImageData
            description
          }
        }
        id
        date
        metadata {
          tags {
            name
            id
            contentful_id
          }
        }
      }
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
