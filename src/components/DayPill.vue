<template>
  <div class="flex flex-col gap-y-4 p-4">
    <div :class="isFutureDay ? 'text-gray-500' : 'text-black'">
      <p class="text-center text-2xl font-semibold">{{ day.dayText }}</p>
      <p class="text-center text-sm">{{ day.monthText }}</p>
    </div>

    <check-box
      v-for="routine in dailyRoutines"
      :key="`${routine.name}-${day.value}`"
      :model-value="routine?.achieved"
      :disabled="isFutureDay"
      :data-routine="JSON.stringify(routine)"
      class="mx-10 lg:mx-0"
      @update:model-value="toggleRoutineAchived(routine.name)"
    >
      {{ routine.name }}
    </check-box>

    <img
      v-if="dailyRoutines.length === 0"
      src="/nothingToDoHere.gif"
      class="w-full h-auto"
    />

    <div v-if="isFutureDay" class="text-gray-500 text-xs">
      {{ $t("youCantMarkTheFuture") }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import useRoutineStore from "../store/routine"
import CheckBox from "./CheckBox.vue"
import { getYYYYMMDD } from "../lib/utils"

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["celebrate"])

const { getDailyRoutines, markRoutineAsDone } = useRoutineStore()

const dailyRoutines = computed(() => getDailyRoutines(props.day.value))

const isFutureDay = computed(() => {
  const today = getYYYYMMDD()
  return props.day.value > today
})

function toggleRoutineAchived(name) {
  markRoutineAsDone({ date: props.day.value, name })
  if (dailyRoutines.value.every(({ achieved }) => achieved)) {
    emit("celebrate")
  }
}
</script>
