<template>
  <router-link
    class="rounded-full border-0 bg-transparent p-0 transition-colors duration-300 size-11"
    :to="to"
  >
    <svg
      :class="[arrowColorClasses, directionClass]"
      class="size-10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm-1.32 5.001L9.5 8.181l3.84 3.82-3.84 3.84 1.18 1.16 5-5-5-5Z"
      />
    </svg>
  </router-link>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  arrowColorClasses: {
    type: String,
    default: "fill-gray-500/50 hover:opacity-70",
  },

  direction: {
    type: String,
    default: "right",
    validator: (val) => ["left", "right"].includes(val),
  },

  to: {
    type: [String, Object],
    required: true,
  },
})

const directionClass = computed(() => {
  if (props.direction === "right") {
    return ""
  }
  if (props.direction === "left") {
    return "rotate-180"
  }
})
</script>
