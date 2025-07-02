import React from "react"
import { graphql } from "gatsby"
import * as styles from "../components/about.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"

const About = ({ data, location }) => {
  const {
    aboutText,
    artCarText,
    leadership,
    headlineText,
    artCarImage,
    partners,
    donateImage,
    donateText,
  } = data.contentfulAboutPage
  return (
    <div className={styles.aboutMain}>
      <Fade triggerOnce={true}>
        <h1 className="heading center">About</h1>
      </Fade>
      <Fade triggerOnce={true}>
        <div
          dangerouslySetInnerHTML={{
            __html: headlineText.childMarkdownRemark.html,
          }}
          className={styles.headline}
        ></div>
      </Fade>
      <Fade triggerOnce={true}>
        <div
          dangerouslySetInnerHTML={{
            __html: aboutText.childMarkdownRemark.html,
          }}
          className={styles.aboutText}
        ></div>
      </Fade>
      {leadership.map((artist, index) => (
        <Fade triggerOnce={true} key={index}>
          <div className={styles.leaderCard}>
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
        </Fade>
      ))}
      <Fade triggerOnce={true}>
        <div className={styles.artCarContainer}>
          <p className="heading">BMW Group Culture</p>
          <div className={styles.artistInfo}>
            <GatsbyImage
              image={artCarImage.gatsbyImageData}
              alt={artCarImage.description}
              className={styles.headshot}
            ></GatsbyImage>
            <div
              dangerouslySetInnerHTML={{
                __html: artCarText.childMarkdownRemark.html,
              }}
              className={styles.bio}
            ></div>
          </div>
        </div>
      </Fade>
      <Fade triggerOnce={true}>
        <p className="heading center">Partners</p>
        <div className={styles.logoContainer}>
          {partners.map((partner, index) => (
            <a
              href={partner.link}
              target="_blank"
              rel="noreferrer"
              className={styles.logo}
            >
              <GatsbyImage
                image={partner.logo.gatsbyImageData}
                key={index}
                alt={partner.logo.description}
              ></GatsbyImage>
            </a>
          ))}
        </div>
      </Fade>
      {donateText && (
        <Fade triggerOnce={true}>
          <div className={styles.artCarContainer}>
            <p className="heading">Support</p>
            <div className={styles.artistInfo}>
              <GatsbyImage
                image={donateImage.gatsbyImageData}
                alt={donateImage.description}
                className={styles.headshot}
              ></GatsbyImage>
              <div
                dangerouslySetInnerHTML={{
                  __html: donateText.childMarkdownRemark.html,
                }}
                className={styles.bio}
              ></div>
            </div>
          </div>
        </Fade>
      )}
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
      donateText {
        childMarkdownRemark {
          html
        }
      }
      artCarImage {
        description
        gatsbyImageData(layout: FULL_WIDTH)
      }
      donateImage {
        description
        gatsbyImageData(layout: FULL_WIDTH)
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
      partners {
        link
        logo {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
`

export const Head = () => <Seo title="About" />

export default About
