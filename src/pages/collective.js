import React, { useState } from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import * as styles from "../components/collective.module.css"
import slugify from "slugify"
import useWindowSize from "../utils/useWindowSize"
import { AnimatePresence, motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Fade } from "react-awesome-reveal"

const Collective = ({ location, data }) => {
  const { collective, workshopParticipants } = data.contentfulCollectivePage
  const [heroImage, setHeroImage] = useState(null)
  const { width } = useWindowSize()
  return (
    <div className={styles.collectiveMain}>
      <Fade triggerOnce={true}>
        <h1 className="heading center">Collective</h1>
      </Fade>
      <Fade triggerOnce={true}>
        <div className={styles.collectiveHeader}>
          {collective.map((member, index) => (
            <a
              href={`#${slugify(member.name, { lower: true })}`}
              key={index}
              className={styles.headerAnchor}
              onMouseEnter={
                width > 920 ? () => setHeroImage(member.headshot) : null
              }
            >
              {member.name}
            </a>
          ))}
          <AnimatePresence>
            {heroImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={heroImage.id}
                className={styles.heroImage}
              >
                <GatsbyImage
                  image={heroImage.gatsbyImageData}
                  alt={heroImage.description}
                ></GatsbyImage>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Fade>
      <div className={styles.collectiveContainer}>
        {collective.map((member, index) => (
          <Fade key={index} triggerOnce={true}>
            <div
              id={`${slugify(member.name, { lower: true })}`}
              className={styles.collectiveMember}
            >
              <GatsbyImage
                className={styles.memberHeadshot}
                image={member.headshot.gatsbyImageData}
                alt={member.headshot.description}
              ></GatsbyImage>
              <p className={styles.mobileMemberName}>{member.name}</p>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>{member.name}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: member.bio.childMarkdownRemark.html,
                  }}
                ></div>
                <div className={styles.memberSocial}>
                  {member.websiteLink && (
                    <a
                      href={member.websiteLink}
                      className={styles.instagramLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website{" "}
                      <svg
                        viewBox="0 0 7 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.5078 4.08228H5.6918V2.61828L5.7638 1.83828L5.7278 1.82628L4.9598 2.69028L0.927801 6.72228L0.3518 6.14628L4.3838 2.11428L5.2478 1.34628L5.2358 1.31028L4.4558 1.38228H2.9918V0.56628H6.5078V4.08228Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  )}
                  {member.instagramLink && (
                    <a
                      className={styles.instagramLink}
                      href={member.instagramLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram{" "}
                      <svg
                        viewBox="0 0 7 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.5078 4.08228H5.6918V2.61828L5.7638 1.83828L5.7278 1.82628L4.9598 2.69028L0.927801 6.72228L0.3518 6.14628L4.3838 2.11428L5.2478 1.34628L5.2358 1.31028L4.4558 1.38228H2.9918V0.56628H6.5078V4.08228Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
      {/* <Fade triggerOnce={true}>
        <h2 className="heading center">Workshop Participants</h2>
      </Fade> */}
      {/* <div className={styles.participantContainer}>
        {workshopParticipants.map((member, index) => (
          <Fade triggerOnce={true} key={index}>
            <div className={styles.participant}>
              <GatsbyImage
                image={member.headshot.gatsbyImageData}
                alt={member.headshot.description}
              ></GatsbyImage>
              <p className={styles.participantName}>{member.name}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: member.bio.childMarkdownRemark.html,
                }}
              ></div>
              <div className={styles.participantSocial}>
                {member.websiteLink && (
                  <a href={member.websiteLink} target="_blank" rel="noreferrer">
                    Website ↗&nbsp;
                  </a>
                )}
                {member.instagramLink && (
                  <a
                    href={member.instagramLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram ↗&nbsp;
                  </a>
                )}
              </div>
            </div>
          </Fade>
        ))}
      </div> */}
    </div>
  )
}

export const query = graphql`
  query {
    contentfulCollectivePage {
      collective {
        bio {
          childMarkdownRemark {
            html
          }
        }
        id
        headshot {
          id
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        websiteLink
        instagramLink
        name
      }
      workshopParticipants {
        bio {
          childMarkdownRemark {
            html
          }
        }
        instagramLink
        headshot {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        name
        websiteLink
      }
    }
  }
`

export const Head = () => <Seo title="Collective" />

export default Collective
