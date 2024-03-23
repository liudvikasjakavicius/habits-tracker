<template>
  <div class="flex flex-col relative">
    <input-text
      :model-value="modelValue"
      :name="name"
      :placeholder="placeholder"
      class="peer"
      @update:model-value="update"
      @focus="selecting = true"
    />
    <div
      v-if="cookedOptions.length > 0"
      class="absolute peer-focus-visible:visible flex-col outline inset-x-0 top-full bg-white outline-1 flex"
      :class="selecting ? 'visible' : 'invisible'"
    >
      <button
        v-for="option in cookedOptions"
        :key="option"
        type="button"
        class="text-left px-2 hover:bg-primary-200"
        :class="
          modelValue === option ? 'bg-primary-400 text-white' : 'bg-white'
        "
        @focus="selecting = true"
        @click="update(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import InputText from "./InputText.vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  options: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["update:model-value"])

const selecting = ref(false)

function isNeedleContained(needle, haystack) {
  // Convert both strings to lowercase for case-insensitive comparison
  const lowerCaseNeedle = needle.toLowerCase()
  const lowerCaseHaystack = haystack.toLowerCase()

  // Check if the lowercased needle is contained within the lowercased haystack
  return lowerCaseHaystack.includes(lowerCaseNeedle)
}

const cookedOptions = computed(() =>
  props.options.filter((option) => isNeedleContained(props.modelValue, option)),
)

function update(option) {
  selecting.value = false
  emit("update:model-value", option)
}
</script>
