<template>
  <button
    class="rounded text-white px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
    :class="themeClass"
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
    validation: (val) => ["primary", "danger", "success"].includes(val),
  },
})

const themeClass = computed(() => {
  switch (props.theme) {
    case "primary":
      return "bg-primary-600 hover:primary-400 focus-visible:primary-400"
    case "danger":
      return "bg-red-600 hover:red-400 focus-visible:red-400"
    case "success":
      return "bg-green-600 hover:green-400 focus-visible:green-400"
    default:
      throw new Error(`Unexpected theme ${props.theme}`)
  }
})
</script>
