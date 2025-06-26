import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./src/css/global.css"

export const shouldUpdateScroll = ({
  routerProps: { location },
  prevRouterProps,
  getSavedScrollPosition,
}) => {
  // transition duration from `layout.js` * 1000 to get time in ms
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 500
  // if it's a "normal" route
  if (
    prevRouterProps &&
    prevRouterProps.location.pathname === location.pathname
  ) {
    return true
  }
  if (location.action === "PUSH") {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      const targetPosition =
        target.getBoundingClientRect().top - 250 + window.scrollY
      window.history.scrollRestoration = "manual"
      window.setTimeout(
        () =>
          window.scrollTo({
            top: targetPosition,
          }),
        TRANSITION_DELAY
      )
    } else window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
  }
  // if we used the browser's forwards or back button
  else {
    //reload, forward
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      const targetPosition =
        target.getBoundingClientRect().top - 250 + window.scrollY
      window.history.scrollRestoration = "manual"
      window.setTimeout(() => window.scrollTo({ top: targetPosition }), 10)
    } else {
      window.history.scrollRestoration = "manual"
      window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
    }
  }
  return false
}
