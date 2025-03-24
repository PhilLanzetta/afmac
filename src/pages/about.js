import React from "react"
import { graphql } from "gatsby"
import * as styles from "../components/about.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const About = ({ data, location }) => {
  const { aboutText, artCarText, leadership, headlineText, partnerLogos } =
    data.contentfulAboutPage
  return (
      <div className={styles.aboutMain}>
        <h1 className="heading center">About</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: headlineText.childMarkdownRemark.html,
          }}
          className={styles.headline}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: aboutText.childMarkdownRemark.html,
          }}
          className={styles.aboutText}
        ></div>
        {leadership.map((artist, index) => (
          <div key={index} className={styles.leaderCard}>
            <p className="heading">About {artist.name}</p>
            <div className={styles.artistInfo}>
              <GatsbyImage
                image={artist.headshot.gatsbyImageData}
                alt={artist.headshot.description}
                className={styles.headshot}
              ></GatsbyImage>
              <div
                dangerouslySetInnerHTML={{
                  __html: artist.bio.childMarkdownRemark.html,
                }}
                className={styles.bio}
              ></div>
            </div>
          </div>
        ))}
        <div className={styles.artCarContainer}>
          <p className="heading">BMW Art Car</p>
          <div
            dangerouslySetInnerHTML={{
              __html: artCarText.childMarkdownRemark.html,
            }}
            className={styles.artCarText}
          ></div>
        </div>
        <p className="heading center">Partners</p>
        <div className={styles.logoContainer}>
          {partnerLogos.map((logo, index) => (
            <GatsbyImage
              image={logo.gatsbyImageData}
              key={index}
              alt={logo.description}
              className={styles.logo}
            ></GatsbyImage>
          ))}
        </div>
      </div>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage {
      aboutText {
        childMarkdownRemark {
          html
        }
      }
      artCarText {
        childMarkdownRemark {
          html
        }
      }
      leadership {
        bio {
          childMarkdownRemark {
            html
          }
        }
        headshot {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        name
      }
      headlineText {
        childMarkdownRemark {
          html
        }
      }
      partnerLogos {
        description
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`

export default About
