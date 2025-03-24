import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Fade } from "react-awesome-reveal"
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
    <div className={styles.journalMain}>
      <Fade triggerOnce={true}>
        <h1 className="heading center">Journal</h1>
      </Fade>
      <Fade triggerOnce={true}>
        <div className={styles.tagContainer}>
          {tags.map(tag => (
            <button className={styles.tagButton}>
              {tag.name.split(": ")[1]}
            </button>
          ))}
        </div>
      </Fade>
      <Fade triggerOnce={true}>
        <div>
          {workshop.length > 1 ? (
            <div></div>
          ) : (
            <div className={styles.workshopHighlight}>
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
                <Link to={`/journal/${workshop[0].slug}`}>
                  Read More &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </Fade>
      <div></div>
    </div>
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
