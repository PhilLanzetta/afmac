import React, { useState } from "react"
import { Fade } from "react-awesome-reveal"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./shop.module.css"
import useStore from "../context/StoreContext"

const ProductTile = ({ item }) => {
  const [variantIndex, setVariantIndex] = useState(0)

  const { addVariantToCart } = useStore()

  const sizes = item.variants
    .map(variant =>
      variant.selectedOptions.filter(option => option.name === "Size")
    )
    .flat()

  const hasSecondImage = item.media.length > 1

  return (
    <Fade triggerOnce={true}>
      <div className={styles.product}>
        <div className={styles.productImageContainer}>
          <GatsbyImage
            image={
              item.media[0]?.image?.localFile?.childImageSharp.gatsbyImageData
            }
            alt="product image"
            className={hasSecondImage ? styles.productFirstImage : styles.productImage}
          ></GatsbyImage>
          {hasSecondImage && (
            <GatsbyImage
              image={
                item.media[1]?.image?.localFile?.childImageSharp.gatsbyImageData
              }
              alt="product image"
              className={styles.productSecondImage}
            ></GatsbyImage>
          )}
        </div>
        <p className={styles.productTitle}>{item.title}</p>
        <p>${item.priceRangeV2.minVariantPrice.amount}</p>
        <p
          className={styles.productInfo}
          dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
        ></p>
        {item.totalInventory > 0 && (
          <>
            {sizes?.length > 0 && (
              <select
                className={styles.sizeSelector}
                onChange={e => setVariantIndex(e.target.value * 1)}
              >
                {sizes.map((size, index) => (
                  <option key={index} value={index}>
                    Size - {size.value}
                  </option>
                ))}
              </select>
            )}
          </>
        )}
        <button
          onClick={() => addVariantToCart(item, variantIndex, 1)}
          className={styles.addToCart}
        >
          ADD TO CART
        </button>
      </div>
    </Fade>
  )
}

export default ProductTile
