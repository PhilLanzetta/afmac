import React, { useState } from "react"
import { Fade } from "react-awesome-reveal"
import * as styles from "../components/shop.module.css"
import useStore from "../context/StoreContext"

const Shop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = useStore()

  return (
    <div className={styles.shopMain}>
      <Fade triggerOnce={true}>
        <div className={styles.shopHead}>
          <h1 className="heading center">Shop</h1>
          <div className={styles.shoppingBagContainer}>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={styles.shoppingBag}
            >
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="cart-number">
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
        </div>
      </Fade>
    </div>
  )
}

export default Shop
