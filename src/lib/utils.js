import confetti from "canvas-confetti"

export function showConfetti(colors = ["#fff", "#29a390"]) {
  const end = Date.now() + 5 * 1000
  let count = 0

  ;(function frame() {
    count += 1
    const color = colors[count % colors.length]

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 100,
      origin: { x: 0, y: 0.4 },
      colors: [color],
    })

    confetti({
      particleCount: 2,
      angle: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: [color],
    })

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 100,
      origin: { x: 1, y: 0.4 },
      colors: [color],
    })

    if (Date.now() < end) {
      window.requestAnimationFrame(frame)
    }
  })()
}

// Get's today's day as YYYY-MM-DD
export function getYYYYMMDD(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

// Date => Wednesday 23
export function formatDay(date, locale = "en") {
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
  })
}

// Date => March 2024
export function formatMonth(date, locale = "en") {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
  })
}

function addIfUnique(array, item) {
  const idx = array.findIndex((el) => {
    return el === item
  })
  if (idx !== -1) return
  array.push(item)
}

function getBrowserPreferredLocales(
  languages = [
    window.navigator.language,
    ...Array.from(window.navigator.languages || []),
  ],
) {
  const locales = []

  languages.forEach((lang) => {
    if (/^\w{2}$/.test(lang)) addIfUnique(locales, lang)

    const result = /^(\w{2})-\w{2}$/.exec(lang)
    if (result) addIfUnique(locales, result[1])
  })

  return locales
}

export function setDocumentLang() {
  const preferredLocales = getBrowserPreferredLocales()
  const supportedLocale = preferredLocales.find((locale) => {
    return ["en", "es", "lt"].includes(locale)
  })
  // English will be the default language in case we don't support any of the preferred languages
  let lang = "en"
  if (supportedLocale) {
    lang = supportedLocale
  }
  document.querySelector("html").setAttribute("lang", lang)
  return lang
}
