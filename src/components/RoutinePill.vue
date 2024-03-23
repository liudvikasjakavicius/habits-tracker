<template>
  <div class="flex items-center">
    <p class="mr-auto ml-2">{{ routine.name }}</p>
    <p>{{ routine.startDate }}</p>
    <edit-button @click="$emit('edit')" :title="$t('editRoutine')" />
    <delete-button @click="$emit('delete')" :title="$t('deleteRoutine')" />
  </div>
</template>

<script setup>
import DeleteButton from "./DeleteButton.vue"
import EditButton from "./EditButton.vue"

defineProps({
  routine: {
    type: Object,
    required: true,
  },
})

defineEmits(["delete", "edit"])
</script>
