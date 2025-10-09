import React, { createContext, useState, useEffect, useContext } from "react"
import fetch from "isomorphic-fetch"
import Client from "shopify-buy"

const client = Client.buildClient(
  {
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    domain: process.env.GATSBY_MYSHOPIFY_URL,
  },
  fetch
)

const defaultValues = {
  cart: [],
  loading: false,
  addVariantToCart: () => {},
  removeLineItem: () => {},
  lowerCartItemQuantity: () => {},
  addCartItemQuantity: () => {},
  client,
  checkout: {
    id: "",
    lineItems: [],
    webUrl: "",
  },
}

const StoreContext = createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(function () {
    let savedCart = []
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || []
    } catch (error) {
      savedCart = []
    }
    return savedCart
  })
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [loading, setLoading] = useState(false)

  const setCheckoutItem = checkout => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (existingCheckout.lineItems?.length < 1) {
            setCart([])
          }
          setCheckoutItem(existingCheckout)
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      } else {
        const newCheckout = await client.checkout.create()
        setCheckoutItem(newCheckout)
        setCart([])
      }
    }

    initializeCheckout()
  }, [])

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart])

  const addVariantToCart = async (product, variantIndex, quantity) => {
    setLoading(true)

    if (checkout.id === "") {
      console.error("No checkout ID assigned.")
      return
    }

    const checkoutID = checkout.id
    const variantId = product.variants[variantIndex]?.shopifyId
    const parsedQuantity = parseInt(quantity, 10)

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parsedQuantity,
      },
    ]

    try {
      const res = await client.checkout.addLineItems(
        checkoutID,
        lineItemsToUpdate
      )
      setCheckout(res)

      let updatedCart = []
      if (cart.length > 0) {
        const itemIsInCart = cart.find(
          item =>
            item.product.variants[variantIndex]?.shopifyId === variantId &&
            item.variantIndex === variantIndex
        )

        if (itemIsInCart) {
          const newProduct = {
            product: { ...itemIsInCart.product },
            variantIndex,
            quantity: itemIsInCart.quantity + parsedQuantity,
          }
          const otherItems = cart.filter(
            item =>
              item.product.variants[variantIndex]?.shopifyId !== variantId ||
              item.variantIndex !== variantIndex
          )
          updatedCart = [...otherItems, newProduct]
        } else {
          updatedCart = cart.concat([
            { product, variantIndex, quantity: parsedQuantity },
          ])
        }
      } else {
        updatedCart = [{ product, variantIndex, quantity: parsedQuantity }]
      }
      setCart(updatedCart)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error in addVariantToCart: ${error}`)
    }
  }

  const lowerCartItemQuantity = async (variantId, variantIndex) => {
    setLoading(true)

    if (checkout.id === "") {
      console.error("No checkout ID assigned.")
      return
    }

    const checkoutID = checkout.id
    let lineItemID = ""
    let currentQuantity = ""
    checkout.lineItems?.forEach(item => {
      if (item.variant.id === variantId) {
        lineItemID = item.id
        currentQuantity = item.quantity
      }
    })

    if (!lineItemID) {
      console.log("Product not in cart")
      return
    }

    const lineItemsToUpdate = [
      {
        id: lineItemID,
        quantity: currentQuantity - 1,
      },
    ]

    try {
      const res = await client.checkout.updateLineItems(
        checkoutID,
        lineItemsToUpdate
      )
      setCheckout(res)

      const itemIsInCart = cart.find(
        item =>
          item.product.variants[variantIndex]?.shopifyId === variantId &&
          item.variantIndex === variantIndex
      )

      let updatedCart = []
      if (itemIsInCart) {
        const newProduct = {
          product: { ...itemIsInCart.product },
          variantIndex,
          quantity: itemIsInCart.quantity > 1 ? itemIsInCart.quantity - 1 : 1,
        }
        const otherItems = cart.filter(
          item =>
            item.product.variants[variantIndex]?.shopifyId !== variantId ||
            item.variantIndex !== variantIndex
        )
        updatedCart = [...otherItems, newProduct]
      } else {
        return
      }
      setCart(updatedCart)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error in lowerCartItemQuatinty: ${error}`)
    }
  }

  const addCartItemQuantity = async (variantId, variantIndex) => {
    setLoading(true)

    if (checkout.id === "") {
      console.error("No checkout ID assigned.")
      return
    }

    const checkoutID = checkout.id
    let lineItemID = ""
    let currentQuantity = ""
    checkout.lineItems?.forEach(item => {
      if (item.variant.id === variantId) {
        lineItemID = item.id
        currentQuantity = item.quantity
      }
    })

    if (!lineItemID) {
      console.log("Product not in cart")
      return
    }

    const lineItemsToUpdate = [
      {
        id: lineItemID,
        quantity: currentQuantity + 1,
      },
    ]

    try {
      const res = await client.checkout.updateLineItems(
        checkoutID,
        lineItemsToUpdate
      )
      setCheckout(res)

      const itemIsInCart = cart.find(
        item =>
          item.product.variants[variantIndex]?.shopifyId === variantId &&
          item.variantIndex === variantIndex
      )

      let updatedCart = []
      if (itemIsInCart) {
        const newProduct = {
          product: { ...itemIsInCart.product },
          variantIndex,
          quantity: itemIsInCart.quantity + 1,
        }
        const otherItems = cart.filter(
          item =>
            item.product.variants[variantIndex]?.shopifyId !== variantId ||
            item.variantIndex !== variantIndex
        )
        updatedCart = [...otherItems, newProduct]
      } else {
        return
      }
      setCart(updatedCart)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error in lowerCartItemQuatinty: ${error}`)
    }
  }

  const removeLineItem = async (variantId, variantIndex) => {
    setLoading(true)
    try {
      if (checkout.lineItems.length < 1) throw new Error("Cart is empty")

      let lineItemID = ""
      checkout.lineItems?.forEach(item => {
        if (item.variant.id === variantId) {
          lineItemID = item.id
        }
      })

      if (!lineItemID) {
        console.log("Product not in cart")
        return
      }

      const res = await client.checkout.removeLineItems(checkout.id, [
        lineItemID,
      ])
      setCheckout(res)

      const updatedCart = cart.filter(
        item =>
          item.product.variants[variantIndex]?.shopifyId !== variantId ||
          item.variantIndex !== variantIndex
      )
      setCart(updatedCart)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error in removeLineItem: ${error}`)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        lowerCartItemQuantity,
        addCartItemQuantity,
        cart,
        checkout,
        loading,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error("useStore must be used within StoreContext")
  }

  return context
}

export default useStore
