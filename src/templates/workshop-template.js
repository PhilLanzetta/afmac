import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Fade } from "react-awesome-reveal"
import * as styles from "../components/journalEntry.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import VideoPlayer from "../components/videoPlayer"
import VariedWidthCarousel from "../components/variedWidthCarousel"

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
        <Fade triggerOnce={true}>
          <h1 className="heading center">{title}</h1>
          <p className="center">{workshopLocation}</p>
        </Fade>
        <Fade triggerOnce={true}>
          <GatsbyImage
            image={tileImage.gatsbyImageData}
            alt={tileImage.description}
            className={styles.headerImage}
          ></GatsbyImage>
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
        <Fade triggerOnce={true}>
          <div
            dangerouslySetInnerHTML={{
              __html: introText.childMarkdownRemark.html,
            }}
            className={styles.textModule}
          ></div>
        </Fade>
        {content?.map(item => {
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
              <Fade
                triggerOnce={true}
                className={styles.videoContainer}
                key={item.videoId}
              >
                <VideoPlayer
                  video={item}
                  videoId={item.videoId}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                ></VideoPlayer>
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
          } else if (item.slideshowId) {
            return (
              <VariedWidthCarousel images={item.images}></VariedWidthCarousel>
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
            {relatedContent.map((item, index) => (
              <Link
                key={index}
                className={styles.supplementalTile}
                to={`/journal/${item.slug}`}
              ></Link>
            ))}
          </Fade>
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
          caption {
            childMarkdownRemark {
              html
            }
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
        }
        ... on ContentfulTextModule {
          textId: id
          text {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulTwoColumnImage {
          twoColumnId: id
          images {
            caption {
              childMarkdownRemark {
                html
              }
            }
            id
            image {
              description
              gatsbyImageData
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
          }
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
