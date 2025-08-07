import React from "react"
import { Link } from "gatsby"
import * as styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <Link to="/" className={styles.footerLogo}>
          African Film & <br />
          Media Arts Collective
        </Link>
        <div className={styles.footerLinkContainer}>
          <div>
            <a
              href="https://afmac.memberful.com"
              target="_blank"
              rel="noreferrer"
              className={styles.footerUpper}
            >
              Participants
            </a>
          </div>
          <div className={styles.footerColumn}>
            <Link to="/about" className={styles.footerUpper}>
              About
            </Link>
          </div>
          <div className={styles.footerColumn}>
            <p className={styles.footerUpper}>Contact</p>
            <a href="https://afmac.kit.com" target="_blank" rel="noreferrer">
              Email
            </a>
          </div>
          <div className={styles.footerColumn}>
            <p className={styles.footerUpper}>Social</p>
            <a
              href="https://www.instagram.com/a.f.m.a.c"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          <div className={styles.footerColumn}>
            <a
              href="https://bmwgroup.com/culture"
              target="_blank"
              rel="noreferrer"
              className={styles.footerUpper}
            >
              In collaboration with <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 95.364 85.5"
                className={styles.footerBMW}
              >
                <defs>
                  <clipPath id="clip-path">
                    <path
                      id="Path_425"
                      data-name="Path 425"
                      d="M0-141.531H95.364v-85.5H0Z"
                      transform="translate(0 227.031)"
                      fill="none"
                    />
                  </clipPath>
                </defs>
                <g
                  id="Group_108"
                  data-name="Group 108"
                  clip-path="url(#clip-path)"
                >
                  <path
                    id="Path_416"
                    data-name="Path 416"
                    d="M355.273-153.34h-2.616v-13.209h3.895L359.965-156l3.388-10.547h3.893v13.209h-2.7v-9.779l-3.135,9.779h-2.92l-3.219-9.853Zm17.78,0h-2.772v-13.209h2.772Zm5.7,0h-2.664v-13.209h3.27l5.337,9.58v-9.58h2.656v13.209h-3.27l-5.33-9.532Zm14.411,0h-2.768v-13.209h2.768Zm19.673,4.866h-12.7a28.646,28.646,0,0,0,1.609-4.866h16.028L422-157.51H402.409c.067-.8.108-1.613.108-2.434s-.042-1.632-.108-2.434h24.525l4.228-4.17H401.746a28.841,28.841,0,0,0-1.609-4.874h35.956l4.227-4.169H397.892a29.7,29.7,0,0,0-24.983-13.562A29.7,29.7,0,0,0,347.93-175.59H305.5l4.224,4.169H345.69a28.681,28.681,0,0,0-1.615,4.874H314.663l4.224,4.17h24.527c-.066.8-.11,1.613-.11,2.434s.044,1.63.11,2.434H323.825l4.222,4.171h16.028a28.488,28.488,0,0,0,1.615,4.866H332.985l4.224,4.171H347.93a29.7,29.7,0,0,0,24.979,13.564A29.7,29.7,0,0,0,397.892-144.3h10.716ZM372.909-134.91a25.237,25.237,0,0,1-25.378-25.034,25.24,25.24,0,0,1,25.378-25.038,25.241,25.241,0,0,1,25.382,25.038,25.238,25.238,0,0,1-25.382,25.034"
                    transform="translate(-190.448 203.418)"
                    fill="#fff"
                  />
                  <path
                    id="Path_417"
                    data-name="Path 417"
                    d="M46.62-223.118c-23.512,0-42.573,18.8-42.573,42s19.061,42,42.573,42,42.573-18.8,42.573-42-19.061-42-42.573-42m39.807,42c0,21.688-17.824,39.269-39.807,39.269S6.814-159.432,6.814-181.121s17.822-39.267,39.807-39.267,39.807,17.583,39.807,39.267"
                    transform="translate(-2.523 224.592)"
                    fill="#fff"
                  />
                  <path
                    id="Path_418"
                    data-name="Path 418"
                    d="M164-180.2c.578.614,1.41,1.6,1.879,2.2l8.62-5.4c-.429-.555-1.115-1.4-1.628-1.993l-5.459,3.561-.372.317.277-.4,2.409-4.746-1.7-1.681-4.813,2.379-.4.274.323-.369,3.612-5.385c-.635-.534-1.246-1.022-2.025-1.615l-5.474,8.5c.693.526,1.607,1.3,2.189,1.824l5.151-2.635.331-.239-.241.325Z"
                    transform="translate(-99.272 205.851)"
                    fill="#fff"
                  />
                  <path
                    id="Path_419"
                    data-name="Path 419"
                    d="M107.727-201.529l2.356-5.2.148-.46-.042.479.249,6.956c.826.078,1.68.19,2.521.327l-.384-10.3q-1.767-.191-3.521-.268l-2.32,5.681-.082.422-.082-.422L104.252-210q-1.756.074-3.521.268l-.382,10.3c.842-.137,1.695-.249,2.521-.327l.247-6.956-.042-.479.15.46,2.356,5.2Z"
                    transform="translate(-62.557 216.415)"
                    fill="#fff"
                  />
                  <path
                    id="Path_420"
                    data-name="Path 420"
                    d="M48.3-179.587c1.36-1.415,2.134-3.049.771-4.611a2.672,2.672,0,0,0-3.017-.614l-.1.04.034-.089a2.431,2.431,0,0,0-.861-2.573,2.588,2.588,0,0,0-1.9-.523c-1.279.127-2.265.99-4.944,3.937-.808.889-1.984,2.291-2.69,3.2l7.355,6.886c2.445-2.666,3.439-3.656,5.36-5.654m-9.6-1.683a45.462,45.462,0,0,1,3.771-4.053,1.976,1.976,0,0,1,.769-.484.911.911,0,0,1,1.093.7,1.593,1.593,0,0,1-.545,1.343c-.785.87-3.656,3.836-3.656,3.836Zm2.88,2.7s2.8-2.918,3.711-3.853a3.352,3.352,0,0,1,.845-.714.967.967,0,0,1,.992.019.855.855,0,0,1,.376.908,2.694,2.694,0,0,1-.726,1.117c-.384.409-3.7,3.912-3.709,3.918Z"
                    transform="translate(-22.183 202.682)"
                    fill="#fff"
                  />
                  <path
                    id="Path_421"
                    data-name="Path 421"
                    d="M142.337-152.824H117.09V-177.73a25.065,25.065,0,0,1,25.247,24.905"
                    transform="translate(-72.993 196.297)"
                    fill="#fff"
                  />
                  <path
                    id="Path_422"
                    data-name="Path 422"
                    d="M75.3-111.6v24.905A25.065,25.065,0,0,1,50.053-111.6Z"
                    transform="translate(-31.203 155.072)"
                    fill="#fff"
                  />
                  <path
                    id="Path_423"
                    data-name="Path 423"
                    d="M75.3-177.731v24.905H50.053A25.066,25.066,0,0,1,75.3-177.731"
                    transform="translate(-31.203 196.298)"
                    fill="#0066b0"
                  />
                  <path
                    id="Path_424"
                    data-name="Path 424"
                    d="M142.337-111.6A25.065,25.065,0,0,1,117.09-86.694V-111.6Z"
                    transform="translate(-72.993 155.072)"
                    fill="#0066b0"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <a
        href="https://pacificpacific.studio"
        target="_blank"
        rel="noreferrer"
        className={styles.footerCredit}
      >
        Site Credit
      </a>
    </div>
  )
}

export default Footer
