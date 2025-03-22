import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "../components/journal.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const Journal = ({ location, data }) => {
  const [workshop, setWorkshop] = useState(
    data.allContentfulWorkshopEntry.nodes
  )
  const [supplemental, setSupplemental] = useState(
    data.allContentfulSupplementalContent.nodes
  )
  const tags = data.allContentfulTag.nodes

  return (
    <Layout location={location}>
      <div className={styles.journalMain}>
        <h1 className="heading center">Journal</h1>
        <div className={styles.tagContainer}>
          {tags.map(tag => (
            <button className={styles.tagButton}>
              {tag.name.split(": ")[1]}
            </button>
          ))}
        </div>
        <div>
          {workshop.length > 1 ? (
            <div></div>
          ) : (
            <div
              className={styles.workshopHighlight}
            >
              <GatsbyImage
                image={workshop[0].tileImage.gatsbyImageData}
                alt={workshop[0].tileImage.description}
                className={styles.highlightImage}
              ></GatsbyImage>
              <div className={styles.highlightText}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: workshop[0].introText.childMarkdownRemark.excerpt,
                  }}
                ></div>
                <Link to={`/journal/${workshop[0].slug}`}>Read More &rarr;</Link>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulTag {
      nodes {
        id
        name
        contentful_id
      }
    }
    allContentfulWorkshopEntry {
      nodes {
        id
        location
        slug
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        metadata {
          tags {
            id
            name
            contentful_id
          }
        }
        introText {
          childMarkdownRemark {
            excerpt(format: HTML, pruneLength: 250)
          }
        }
      }
    }
    allContentfulSupplementalContent {
      nodes {
        id
        tileDisplay {
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        date
        metadata {
          tags {
            id
            name
            contentful_id
          }
        }
      }
    }
  }
`

export default Journal
