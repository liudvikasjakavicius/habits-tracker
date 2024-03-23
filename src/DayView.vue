<template>
  <div
    class="relative grid h-full min-h-[calc(100svh-64px)]"
    :class="colsClass"
  >
    <audio
      ref="audioElement"
      src="/cheer.mp3"
      :disabled="audioDisabled"
      @ended="audioDisabled = false"
    />

    <div class="absolute inset-x-0 h-svh flex items-center justify-between">
      <arrow-link
        :to="previousLink"
        direction="left"
        :aria-label="$t('previousPage')"
      />
      <arrow-link
        :to="nextLink"
        direction="right"
        :aria-label="$t('nextPage')"
      />
    </div>

    <day-pill
      v-for="day in days"
      :key="day.value"
      :day="day"
      class="w-full h-full"
      :class="day.class"
      @celebrate="celebrate"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { add } from "date-fns"
import { useI18n } from "vue-i18n"

import { getYYYYMMDD, showConfetti, formatDay, formatMonth } from "./lib/utils"
import { useScreenSize } from "./composables/useScreenSize"

import DayPill from "./components/DayPill.vue"
import ArrowLink from "./components/ArrowLink.vue"

const props = defineProps({
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
})

const audioElement = ref(null)
const audioDisabled = ref(false)

const { isDesktop, isTablet, isMobile } = useScreenSize()
const { locale } = useI18n()

const numberOfDays = computed(() => {
  if (isDesktop.value) {
    return 5
  }
  if (isTablet.value) {
    return 3
  }
  return 1
})

const colsClass = computed(() => {
  switch (numberOfDays.value) {
    case 5:
      return "grid-cols-5"
    case 3:
      return "grid-cols-3"
    case 1:
      return "grid-cols-1"
    default:
      throw new Error(`Unexpected number of columns ${numberOfDays.value}`)
  }
})

const previousLink = computed(() => {
  const date = new Date(props.date)
  const previousDay = add(date, {
    days: -numberOfDays.value,
    hours: 12,
  })
  return `/day/${getYYYYMMDD(previousDay)}`
})

const nextLink = computed(() => {
  const date = new Date(props.date)
  const nextDay = add(date, {
    days: numberOfDays.value,
    hours: 12,
  })
  return `/day/${getYYYYMMDD(nextDay)}`
})

const days = computed(() => {
  const date = new Date(props.date)
  const diffs = Array.from(
    { length: numberOfDays.value },
    (_, index) => -Math.floor(numberOfDays.value / 2) + index,
  )

  return diffs.map((d) => {
    // We need to add 12h to keep in mind time change and avoid April 1st to become March 30th
    const day = add(date, {
      days: d,
      hours: 12,
    })
    const value = getYYYYMMDD(day)
    return {
      dayText: formatDay(day, locale.value),
      monthText: formatMonth(day, locale.value),
      value,
      class: {
        "bg-primary-300": value === getYYYYMMDD(),
        "bg-primary-200": value === props.date,
        "bg-primary-100": value !== props.date,
        "w-[calc(100%/7)]": isDesktop.value,
        "w-1/3": isTablet.value,
        "w-full": isMobile.value,
      },
    }
  })
})

function celebrate() {
  if (audioDisabled.value) return
  audioDisabled.value = true
  showConfetti()
  audioElement.value.play()
}
</script>
