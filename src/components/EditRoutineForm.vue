<template>
  <form
    class="bg-white rounded p-8 relative flex flex-col gap-y-4"
    @submit.prevent="submit"
  >
    <close-button
      class="absolute top-0 right-0"
      :title="$t('closeWindow')"
      @click="$emit('close')"
    />
    <p>{{ $t("editingRoutine", { routine: name }) }}</p>
    <input-text v-model="newName" :placeholder="$t('enterNewName')" />
    <input-datalist
      v-model="newCategory"
      :placeholder="$t('chooseCategory')"
      :options="categories"
    />
    <input-text
      :model-value="newStartDate"
      type="date"
      :placeholder="$t('enterStartDate')"
      @update:model-value="updateDate"
    />
    <base-button>{{ $t("update") }}</base-button>
  </form>
</template>

<script setup>
import { computed, ref } from "vue"
import useRoutineStore from "../store/routine"
import CloseButton from "./CloseButton.vue"
import BaseButton from "./BaseButton.vue"
import InputDatalist from "./InputDatalist.vue"
import InputText from "./InputText.vue"

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["close", "submit"])

const { routines, categories } = useRoutineStore()
const currentRoutine = computed(() => {
  return routines.find((r) => r.name === props.name)
})

const newName = ref(currentRoutine.value.name)
const newCategory = ref(currentRoutine.value.category)
const newStartDate = ref(currentRoutine.value.startDate)

function submit() {
  emit("submit", {
    oldName: props.name,
    newName: newName.value,
    category: newCategory.value,
    startDate: newStartDate.value,
  })
}

function updateDate(date) {
  newStartDate.value = date
}
</script>
