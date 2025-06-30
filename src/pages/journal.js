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
  const [locationActiveButton, setLocationActiveButton] = useState()
  const [artistActiveButton, setArtistActiveButton] = useState()

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }
  
  const locations = data.allContentfulWorkshopEntry.nodes
    .map(node => node.location)
    .filter(onlyUnique)

  const artists = data.allContentfulSupplementalContent.nodes
    .map(node => node.artist)
    .filter(item => item !== null)
    .filter(onlyUnique)

  const contentFilter = (type, value, index) => {
    if (type === "location") {
      if (locationActiveButton === index) {
        setWorkshop(data.allContentfulWorkshopEntry.nodes)
        setLocationActiveButton()
      } else {
        setLocationActiveButton(index)
        setArtistActiveButton()
        setWorkshop(
          data.allContentfulWorkshopEntry.nodes.filter(
            item => item.location === value
          )
        )
        setSupplemental(data.allContentfulSupplementalContent.nodes)
      }
    } else {
      if (artistActiveButton === index) {
        setSupplemental(data.allContentfulSupplementalContent.nodes)
        setArtistActiveButton()
      } else {
        setArtistActiveButton(index)
        setLocationActiveButton()
        const artistFirst = data.allContentfulSupplementalContent.nodes.filter(
          node => node.artist === value
        )
        const everythingElse =
          data.allContentfulSupplementalContent.nodes.filter(
            node => node.artist !== value
          )
        setSupplemental(artistFirst.concat(everythingElse))
        setWorkshop(data.allContentfulWorkshopEntry.nodes)
      }
    }
  }

  return (
    <div className={styles.journalMain}>
      <Fade triggerOnce={true}>
        <h1 className="heading center">Journal</h1>
      </Fade>
      <Fade triggerOnce={true}>
        <div className={styles.tagContainer}>
          {locations.map((location, index) => (
            <button
              className={`${styles.tagButton} ${
                locationActiveButton === index ? styles.activeTagButton : ""
              }`}
              key={index}
              onClick={() => contentFilter("location", location, index)}
            >
              {location}
            </button>
          ))}
          {artists.map((artist, index) => (
            <button
              className={`${styles.tagButton} ${
                artistActiveButton === index ? styles.activeTagButton : ""
              }`}
              key={index}
              onClick={() => contentFilter("artist", artist, index)}
            >
              {artist}
            </button>
          ))}
        </div>
      </Fade>
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
                <p>{entry.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </Fade>
      <div className={styles.supplementalContainer}>
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
                <p>{entry.title}</p>
                <p>
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "Europe/London",
                  })}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
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
        title
        artist
      }
    }
  }
`

export default Journal
