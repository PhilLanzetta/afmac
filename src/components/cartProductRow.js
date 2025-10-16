import React from "react"
import * as styles from "./shop.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import useStore from "../context/StoreContext"

const CartProductRow = ({ item }) => {
  const { product, quantity, variantIndex } = item
  const { removeLineItem, lowerCartItemQuantity, addCartItemQuantity } =
    useStore()

  const size = product.variants
    .map(variant =>
      variant.selectedOptions.filter(option => option.name === "Size")
    )
    ?.flat()[variantIndex]

  return (
    <div className={styles.cartRowContainer}>
      <div>
        <div className={styles.cartHeading}>Product</div>
        <div className={styles.cartProductContainer}>
          <div className={styles.cartProductImageContainer}>
            {product.featuredImage ? (
              <GatsbyImage
                image={
                  product.featuredImage?.localFile?.childImageSharp
                    .gatsbyImageData
                }
                alt="product image"
              ></GatsbyImage>
            ) : (
              <GatsbyImage
                image={
                  product.media[0]?.image?.localFile?.childImageSharp
                    .gatsbyImageData
                }
                alt="product image"
              ></GatsbyImage>
            )}
          </div>
          <div className={styles.cartProductInfo}>
            <p>{product.title}</p>
            {size && <p className={styles.cartSize}>Size - {size.value}</p>}
          </div>
        </div>
      </div>
      <div className={styles.cartProductRight}>
        <div>
          <div className={styles.cartHeading}>Price</div>
          <div>${product.priceRangeV2.minVariantPrice.amount}</div>
        </div>
        <div>
          <div className={styles.cartHeading}>Quantity</div>
          <div className={styles.quantityBtns}>
            <button
              onClick={() => {
                if (quantity > 1) {
                  lowerCartItemQuantity(
                    product.variants[variantIndex]?.shopifyId,
                    variantIndex
                  )
                } else {
                  removeLineItem(
                    product.variants[variantIndex]?.shopifyId,
                    variantIndex
                  )
                }
              }}
            >
              -
            </button>
            <div>{quantity}</div>
            <button
              onClick={() =>
                addCartItemQuantity(
                  product.variants[variantIndex]?.shopifyId,
                  variantIndex
                )
              }
            >
              +
            </button>
          </div>
        </div>
        <div>
          <div className={styles.cartHeading}>Total</div>
          <div>${product.priceRangeV2.minVariantPrice.amount * quantity}</div>
        </div>
      </div>
    </div>
  )
}

export default CartProductRow
