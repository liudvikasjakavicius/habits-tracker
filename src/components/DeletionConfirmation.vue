<template>
  <form
    @submit.prevent="$emit('confirm')"
    class="bg-white rounded p-5 sm:p-8 relative"
  >
    <p class="mb-4">{{ $t("deleteRoutineConfirmation", { routine: name }) }}</p>
    <div class="flex gap-2">
      <base-button type="submit" theme="success">{{ $t("yes") }}</base-button>
      <base-button type="cancel" theme="danger" @click="$emit('cancel')">
        $t("no")
      </base-button>
    </div>
  </form>
</template>

<script setup>
import BaseButton from "./BaseButton.vue"

defineProps({
  name: {
    type: String,
    required: true,
  },
})

defineEmits(["confirm", "cancel"])
</script>
