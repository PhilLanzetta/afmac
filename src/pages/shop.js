import React, { useState } from "react"
import { Fade } from "react-awesome-reveal"
import * as styles from "../components/shop.module.css"
import useStore from "../context/StoreContext"
import { graphql } from "gatsby"
import ProductTile from "../components/productTile"
import CartProductRow from "../components/cartProductRow"
import { AnimatePresence, motion } from "framer-motion"
import Seo from "../components/seo"

const Shop = ({ data }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart, checkout } = useStore()
  const formattedNum = num =>
    Number(num)
      .toFixed(2)
      .replace(/[.,]00$/, "")
  const products = data.allShopifyProduct.nodes

  return (
    <div className={styles.shopMain}>
      <Fade triggerOnce={true} className={styles.shopHeadContainer}>
        <div className={styles.shopHead}>
          <h1 className="heading center">Shop</h1>
          <div className={styles.shoppingBagContainer}>
            <AnimatePresence>
              {isCartOpen && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCartOpen(false)}
                >
                  X CLOSE
                </motion.button>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={styles.shoppingBag}
            >
              <span>Cart</span>
              {cart.length > 0 && (
                <span className={styles.cartNumber}>
                  {cart
                    .map(item => item.quantity)
                    .reduce((prev, next) => prev + next)}
                </span>
              )}
              <svg
                className="cart-svg"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.095 4.5H2.90499C2.39124 4.5 1.96107 4.8893 1.90995 5.4005L1.10995 13.4005C1.05108 13.9892 1.51337 14.5 2.10499 14.5H10.895C11.4866 14.5 11.9489 13.9892 11.89 13.4005L11.09 5.4005C11.0389 4.88929 10.6088 4.5 10.095 4.5Z"
                  stroke="white"
                />
                <path
                  d="M4 5.50004V2.5C4 1 5 0.5 6.5 0.5C7.85088 0.5 9 1 9 2.50004V5.50004"
                  stroke="white"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <AnimatePresence>
            {isCartOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.cartContainer}
              >
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <CartProductRow key={index} item={item}></CartProductRow>
                  ))
                ) : (
                  <div>Your cart is empty.</div>
                )}
                <article className={styles.cartSummary}>
                  <div className={styles.checkoutInfo}>
                    <div>
                      SUBTOTAL: $
                      {checkout.totalPrice
                        ? formattedNum(checkout.totalPrice?.amount)
                        : 0}
                    </div>
                  </div>
                  <div>TAXES AND SHIPPING CALCULATED AT CHECKOUT</div>
                  <button
                    disabled={cart.length === 0}
                    onClick={() => window.open(checkout.webUrl)}
                    className={styles.checkoutBtn}
                  >
                    PURCHASE
                  </button>
                </article>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Fade>

      <div className={styles.productsContainer}>
        {products.map(item => (
          <ProductTile key={item.id} item={item}></ProductTile>
        ))}
      </div>
      {isCartOpen && (
        <button
          aria-label="close cart"
          onClick={() => setIsCartOpen(false)}
          className={styles.clickToCloseCart}
        ></button>
      )}
    </div>
  )
}

export const query = graphql`
  query {
    allShopifyProduct {
      nodes {
        descriptionHtml
        id
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        variants {
          shopifyId
          selectedOptions {
            name
            value
          }
          inventoryQuantity
        }
        totalInventory
        title
        media {
          ... on ShopifyMediaImage {
            id
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  }
`
export const Head = () => <Seo title="Shop" />

export default Shop
