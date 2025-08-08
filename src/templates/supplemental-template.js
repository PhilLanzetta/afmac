import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Fade } from "react-awesome-reveal"
import * as styles from "../components/journalEntry.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import VideoPlayer from "../components/videoPlayer"
import VariedWidthCarousel from "../components/variedWidthCarousel"
import Seo from "../components/seo"

const Supplemental = ({ location, data }) => {
  const [activeVideo, setActiveVideo] = useState(null)
  const { title, supplementalLocation, content, date, relatedContent } =
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
                  style={{ borderRadius: item.roundedCorners ? "20px" : "0px" }}
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
          } else if (item.twoColumnId) {
            return (
              <Fade triggerOnce={true} key={item.twoColumnId}>
                <div className={styles.twoColumn}>
                  {item.images.map(image => (
                    <div key={image.id} className={styles.twoColumnImage}>
                      <GatsbyImage
                        image={image.image.gatsbyImageData}
                        alt={image.image.description}
                        className={styles.twoColumnImage}
                        style={{
                          borderRadius: item.roundedCorners ? "20px" : "0px",
                        }}
                      ></GatsbyImage>
                      {image.caption && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: image.caption.childMarkdownRemark.html,
                          }}
                          className={styles.twoColumnCaption}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
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
          } else if (item.slideshowId) {
            return (
              <VariedWidthCarousel
                images={item.images}
                key={item.slideshowId}
              ></VariedWidthCarousel>
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
            <div className={styles.supplementalContainer}>
              {relatedContent.map((item, index) => (
                <Link
                  key={index}
                  className={styles.supplementalTile}
                  to={`/journal/${item.slug}`}
                >
                  {item.tileDisplay?.imageDisplayId && (
                    <GatsbyImage
                      image={item.tileDisplay.image.gatsbyImageData}
                      alt={item.tileDisplay.image.description}
                      className={styles.supplementalDisplay}
                      style={{
                        borderRadius: "20px",
                      }}
                    ></GatsbyImage>
                  )}
                  {item.tileImage && (
                    <GatsbyImage
                      image={item.tileImage.gatsbyImageData}
                      alt={item.tileImage.description}
                      className={styles.supplementalDisplay}
                      style={{
                        borderRadius: "20px",
                      }}
                    ></GatsbyImage>
                  )}
                  {item.tileDisplay?.textDisplayId && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.tileDisplay.text.childMarkdownRemark.html,
                      }}
                      className={styles.tileDisplayText}
                    ></div>
                  )}
                  <div>
                    <p>{item.tileTitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Fade>
        </div>
      )}
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
          roundedCorners
        }
        ... on ContentfulTextModule {
          textId: id
          text {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulImageSlideshow {
          slideshowId: id
          images {
            id
            caption {
              childMarkdownRemark {
                html
              }
            }
            image {
              description
              gatsbyImageData
              height
              width
            }
            roundedCorners
          }
        }
        ... on ContentfulVideoModule {
          videoId: id
          aspectRatio
          posterImage {
            description
            gatsbyImageData
          }
          videoLink
          roundedCorners
        }
      }
      date
      relatedContent {
        ... on ContentfulSupplementalContent {
          id
          slug
          tileDisplay {
            ... on ContentfulImageModule {
              imageDisplayId: id
              image {
                description
                gatsbyImageData
              }
              roundedCorners
            }
          }
          tileTitle
        }
        ... on ContentfulWorkshopEntry {
          id
          slug
          tileImage {
            description
            gatsbyImageData
          }
          tileTitle
        }
      }
    }
  }
`
export const Head = ({ data }) => (
  <Seo title={data.contentfulSupplementalContent.title} />
)

export default Supplemental
