import { inject, ref } from "vue"

const isDesktopKey = Symbol("isDesktop")
const isTabletKey = Symbol("isTablet")
const isMobileKey = Symbol("isMobile")

export const ScreenSizePlugin = {
  install(app) {
    const mqlDesktop = window.matchMedia("(min-width: 1024px")
    const mqlTablet = window.matchMedia(
      "(min-width:767px) and (max-width: 1023px)",
    )
    const mqlMobile = window.matchMedia("(max-width:766px)")

    const isDesktop = ref(mqlDesktop.matches)
    const isTablet = ref(mqlTablet.matches)
    const isMobile = ref(mqlMobile.matches)

    function desktopListener({ matches }) {
      isDesktop.value = matches
    }

    function tabletListener({ matches }) {
      isTablet.value = matches
    }

    function mobileListener({ matches }) {
      isMobile.value = matches
    }

    mqlDesktop.addEventListener("change", desktopListener)
    mqlTablet.addEventListener("change", tabletListener)
    mqlMobile.addEventListener("change", mobileListener)

    app.provide(isDesktopKey, isDesktop)
    app.provide(isTabletKey, isTablet)
    app.provide(isMobileKey, isMobile)
  },
}

export const useScreenSize = () => {
  const isDesktop = inject(isDesktopKey)
  const isTablet = inject(isTabletKey)
  const isMobile = inject(isMobileKey)

  return {
    isDesktop,
    isTablet,
    isMobile,
  }
}
