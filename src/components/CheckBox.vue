<template>
  <div class="relative">
    <input
      class="peer pointer-events-none absolute p-0 opacity-0"
      type="checkbox"
      :id="id"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:model-value', !modelValue)"
    />
    <label
      :for="id"
      class="peer-checked:line-through fill-primary-500 peer-disabled:fill-gray-300 peer-disabled:text-gray-500 flex items-center gap-x-2 peer-focus-visible:ring-4 ring-primary/40"
    >
      <svg
        v-if="modelValue"
        class="size-6 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm-5.926 7.338-3.788 3.885-1.36-1.402a1.11 1.11 0 0 0-1.595 0 1.172 1.172 0 0 0 0 1.632l2.157 2.207a1.11 1.11 0 0 0 1.596 0l4.585-4.69a1.172 1.172 0 0 0 0-1.632 1.11 1.11 0 0 0-1.595 0Z"
        />
      </svg>
      <svg
        v-else
        class="size-6 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm-1 2H4v16h16V4Z"
        />
      </svg>

      <slot />
    </label>
  </div>
</template>

<script setup>
import uniqueId from "lodash/uniqueId"

const id = uniqueId()

defineProps({
  modelValue: Boolean,
  disabled: Boolean,
})

defineEmits(["update:model-value"])
</script>
