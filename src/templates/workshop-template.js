import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as styles from "../components/journalEntry.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const Workshop = ({ location, data }) => {
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
    <Layout location={location}>
      <div className={styles.journalMain}>
        <h1 className="heading center">{title}</h1>
        <p className="center">{workshopLocation}</p>
        <GatsbyImage
          image={tileImage.gatsbyImageData}
          alt={tileImage.description}
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
        ></div>
      </div>
    </Layout>
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
