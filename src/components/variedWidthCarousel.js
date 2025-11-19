import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import Slider from "react-slick"
import * as styles from "./variedWidthCarousel.module.css"
import useWindowSize from "../utils/useWindowSize"

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.carouselSVG}
        viewBox="0 0 13.047 28.672"
      >
        <path
          id="Polygon_3"
          data-name="Polygon 3"
          d="M0,12.009,14.011,0,28.021,12.009"
          transform="translate(12.389 0.325) rotate(90)"
          fill="none"
          stroke="#000"
          stroke-width="1"
        />
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to previous"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.carouselSVG}
        viewBox="0 0 13.047 28.672"
      >
        <path
          id="Polygon_4"
          data-name="Polygon 4"
          d="M0,12.009,14.011,0,28.021,12.009"
          transform="translate(0.659 28.346) rotate(-90)"
          fill="none"
          stroke="#000"
          stroke-width="1"
        />
      </svg>
    </div>
  )
}

const VariedWidthCarousel = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { height, width } = useWindowSize()
  const isMobile = height > width

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    autoplay: true,
    useTransform: false,
    dots: false,
    arrows: true,
    afterChange: current => setActiveSlide(current),
    variableWidth: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }
  return (
    <div className={styles.sliderContainer}>
      {images?.length > 1 && (
        <div className={styles.slideCount}>
          {Math.round(activeSlide + 1)} / {images.length}
        </div>
      )}
      <Slider {...settings} style={{ height: isMobile ? "20vh" : "50vh" }}>
        {images?.map(image => {
          const imgWidth = isMobile
            ? (image.image?.width * 20) / image.image?.height
            : (image.image?.width * 50) / image.image?.height
          return (
            <div
              key={image.id}
              style={{
                width: `calc(${imgWidth}vh + 20px)`,
              }}
              className={styles.slide}
            >
              <div className={styles.slideContainer}>
                <figure>
                  <GatsbyImage
                    image={image.image?.gatsbyImageData}
                    alt={image.image?.description}
                    style={{
                      height: isMobile ? "20vh" : "50vh",
                      width: `${imgWidth}vh`,
                    }}
                    className={image.roundedCorners ? styles.imageBorder : ""}
                  ></GatsbyImage>
                  <figcaption
                    dangerouslySetInnerHTML={{
                      __html: image.caption?.childMarkdownRemark.html.replace(
                        /\b(\d+)\/(\d+)/g,
                        "<span class='fraction'><sup>$1</sup>&frasl;<sub>$2</sub></span>"
                      ),
                    }}
                    className={styles.imageModuleCaption}
                  ></figcaption>
                </figure>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default VariedWidthCarousel
