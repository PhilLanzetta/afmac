import React, { useState } from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../components/collective.module.css"
import slugify from "slugify"
import useWindowSize from "../utils/useWindowSize"
import { AnimatePresence, motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"

const Collective = ({ location, data }) => {
  const { collective, workshopParticipants } = data.contentfulCollectivePage
  const [heroImage, setHeroImage] = useState(null)
  const { width } = useWindowSize()
  return (
    <Layout location={location}>
      <div className={styles.collectiveMain}>
        <h1 className="heading center">Collective</h1>
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
        <div className={styles.collectiveContainer}>
          {collective.map((member, index) => (
            <div
              key={index}
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
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website &#8599;
                    </a>
                  )}
                  {member.instagramLink && (
                    <a
                      href={member.instagramLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram &#8599;
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="heading center">Workshop Participants</h2>
        <div className={styles.participantContainer}>
          {workshopParticipants.map((member, index) => (
            <div key={index} className={styles.participant}>
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
                    Website &#8599;
                  </a>
                )}
                {member.instagramLink && (
                  <a
                    href={member.instagramLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram &#8599;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Collective" />

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

export default Collective
