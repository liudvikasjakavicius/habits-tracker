import { createApp } from "vue"
import { createI18n } from "vue-i18n"

import "./style.css"
import { createPinia } from "pinia"
import piniaPersistedState from "pinia-plugin-persistedstate"
import { ScreenSizePlugin } from "./composables/useScreenSize"

import App from "./App.vue"
import router from "./router"
import { setDocumentLang } from "./lib/utils"

import enLocale from "./locales/en.json"
import esLocale from "./locales/es.json"
import ltLocale from "./locales/lt.json"

// takes the preferred locale from the browser settings
const lang = setDocumentLang()

const i18n = createI18n({
  locale: lang,
  messages: {
    en: enLocale,
    es: esLocale,
    lt: ltLocale,
  },
  legacy: false,
})

const pinia = createPinia()
pinia.use(piniaPersistedState)

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(pinia)
app.use(ScreenSizePlugin)
app.mount("#app")
