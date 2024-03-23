<template>
  <input
    class="p-2 focus-within:outline-primary-500 focus-within:outline-2 outline outline-1 rounded-sm"
    type="text"
    v-model="modelValue"
  />
</template>

<script setup>
const modelValue = defineModel({ type: String })
</script>
