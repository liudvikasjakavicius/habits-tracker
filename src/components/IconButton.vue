<template>
  <button
    type="button"
    class="size-9 shrink-0 p-2 rounded-full transition-all"
    :class="themeClass"
    :title="title"
    :aria-label="title"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  theme: {
    type: String,
    default: "primary",
  },
  title: {
    type: String,
    default: "",
  },
})

const themeClass = computed(() => {
  switch (props.theme) {
    case "primary":
      return "hover:fill-primary-500 focus-visible:fill-primary-500 outline-primary-500/50"
    case "white":
      return "fill-white hover:fill-white-200 focus-visible:fill-white-200 outline-white-300/50"
    default:
      throw new Error(`Unexpected theme ${props.theme}`)
  }
})
</script>
