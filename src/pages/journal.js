import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Fade } from "react-awesome-reveal"
import * as styles from "../components/journal.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

const Journal = ({ location, data }) => {
  const [workshop, setWorkshop] = useState(
    data.allContentfulWorkshopEntry.nodes
  )
  const [supplemental, setSupplemental] = useState(
    data.allContentfulSupplementalContent.nodes
  )

  const [activeTagButton, setActiveTagButton] = useState()
  const [isFiltered, setIsFiltered] = useState(false)

  const tags = data.allContentfulTag.nodes

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const contentFilter = (tag, index) => {
    if (activeTagButton === index) {
      setWorkshop(data.allContentfulWorkshopEntry.nodes)
      setSupplemental(data.allContentfulSupplementalContent.nodes)
      setActiveTagButton()
      setIsFiltered(false)
    } else {
      setActiveTagButton(index)
      setWorkshop(
        data.allContentfulWorkshopEntry.nodes.reduce((acc, current) => {
          if (
            current.metadata?.tags.filter(
              tagArray => tagArray.name === tag.name
            ).length > 0
          ) {
            return [...acc, current]
          }
          return acc
        }, [])
      )
      setSupplemental(
        data.allContentfulSupplementalContent.nodes.reduce((acc, current) => {
          if (
            current.metadata?.tags.filter(
              tagArray => tagArray.name === tag.name
            ).length > 0
          ) {
            return [...acc, current]
          }
          return acc
        }, [])
      )
      setIsFiltered(true)
    }
  }

  return (
    <div className={styles.journalMain}>
      <Fade triggerOnce={true}>
        <h1 className="heading center">Journal</h1>
      </Fade>
      <Fade triggerOnce={true}>
        <div className={styles.tagContainer}>
          {tags.map((tag, index) => (
            <button
              className={`${styles.tagButton} ${
                activeTagButton === index ? styles.activeTagButton : ""
              }`}
              key={index}
              onClick={() => contentFilter(tag, index)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </Fade>
      {isFiltered ? (
        <Fade triggerOnce={true}>
          <div className={styles.filterContainer}>
            {workshop.map((entry, index) => (
              <Link
                key={index}
                to={`/journal/${entry.slug}`}
                className={styles.filterFeatureTile}
              >
                {entry.tileImage && (
                  <GatsbyImage
                    image={entry.tileImage.gatsbyImageData}
                    alt={entry.tileImage.description}
                    className={styles.supplementalDisplay}
                  ></GatsbyImage>
                )}
                <p>{entry.tileTitle}</p>
              </Link>
            ))}
            {supplemental.map((entry, index) => {
              const image = entry.tileDisplay.imageDisplayId
              const text = entry.tileDisplay.textDisplayId
              return (
                <Link
                  key={index}
                  className={styles.supplementalTile}
                  to={`/journal/${entry.slug}`}
                >
                  {image && (
                    <GatsbyImage
                      image={entry.tileDisplay.image.gatsbyImageData}
                      alt={entry.tileDisplay.image.description}
                      className={styles.supplementalDisplay}
                    ></GatsbyImage>
                  )}
                  {text && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: entry.tileDisplay.text.childMarkdownRemark.html,
                      }}
                      className={styles.tileDisplayText}
                    ></div>
                  )}
                  <div>
                    <p>{entry.tileTitle}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </Fade>
      ) : (
        <>
          <Fade triggerOnce={true}>
            <div>
              <div className={styles.workshopHighlightsContainer}>
                {workshop.map((entry, index) => (
                  <Link
                    key={index}
                    to={`/journal/${entry.slug}`}
                    className={styles.multipleHighlightContainer}
                  >
                    {entry.tileImage && (
                      <GatsbyImage
                        image={entry.tileImage.gatsbyImageData}
                        alt={entry.tileImage.description}
                        className={styles.multipleHighlightImage}
                      ></GatsbyImage>
                    )}
                    <p>{entry.tileTitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Fade>
          <div className={styles.supplementalContainer}>
            {supplemental.map((entry, index) => {
              const image = entry.tileDisplay?.imageDisplayId
              const text = entry.tileDisplay?.textDisplayId
              return (
                <Link
                  key={index}
                  className={styles.supplementalTile}
                  to={`/journal/${entry.slug}`}
                >
                  {image && (
                    <GatsbyImage
                      image={entry.tileDisplay.image.gatsbyImageData}
                      alt={entry.tileDisplay.image.description}
                      className={styles.supplementalDisplay}
                    ></GatsbyImage>
                  )}
                  {text && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: entry.tileDisplay.text.childMarkdownRemark.html,
                      }}
                      className={styles.tileDisplayText}
                    ></div>
                  )}
                  <div>
                    <p>{entry.tileTitle}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export const query = graphql`
  query {
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
    allContentfulSupplementalContent {
      nodes {
        id
        slug
        tileDisplay {
          ... on ContentfulImageModule {
            imageDisplayId: id
            image {
              description
              gatsbyImageData
            }
          }
        }
        date
        tileTitle
        title
        artist
        metadata {
          tags {
            id
            name
          }
        }
      }
    }
    allContentfulTag {
      nodes {
        id
        name
      }
    }
  }
`
export const Head = () => <Seo title="Journal" />

export default Journal
