<template>
  <main
    class="mx-auto max-w-5xl w-full lg:p-8 p-5 mb-12 flex flex-col gap-y-4 relative"
  >
    <h1 class="font-semibold text-2xl">{{ $t("myRoutines") }}</h1>

    <img
      src="/habit.png"
      class="size-10 absolute sm:-left-4 right-4 opacity-20"
      alt="logo"
    />

    <p>
      {{
        $t("categoriesAndRoutinesWereAdded", {
          routines: routineStore.routines.length,
          categories: routineStore.categories.length,
        })
      }}
    </p>

    <div
      v-for="category in routinesByCategory"
      :key="category"
      class="border border-primary rounded-sm"
    >
      <h2
        class="font-semibold flex items-center text-lg bg-primary text-white pl-2 rounded-t-sm"
      >
        {{ category.category }}
        <add-button
          class="ml-auto"
          :title="$t('addRoutineToThisCategory')"
          @click="addRoutineToCategory(category.category)"
        />
      </h2>

      <routine-pill
        v-for="routine in category.routines"
        :key="routine.name"
        :routine="routine"
        @delete="handleDeleteRoutine(routine.name)"
        @edit="handleEditRoutine(routine.name)"
      />
    </div>

    <div v-if="routineStore.routines.length === 0">
      {{ $t("addYourFirstRoutine") }}
    </div>

    <h2 v-else class="text-xl">{{ $t("addMoreRoutinesAndCategories") }}</h2>

    <form class="grid lg:grid-cols-3 gap-4" @submit.prevent="submit">
      <input-text
        ref="routineInput"
        name="routine"
        :placeholder="$t('addNewRoutine')"
        v-model="routineName"
      />

      <input-datalist
        name="category"
        :placeholder="$t('addNewCategory')"
        :options="routineStore.categories"
        :model-value="routineCategory"
        @update:model-value="routineCategory = $event"
      />

      <base-button :disabled="disabled" type="submit">
        {{ $t("addRoutine") }}
      </base-button>
    </form>
  </main>

  <div
    v-if="editing || deleting"
    class="absolute z-10 bg-black/50 inset-0 h-svh flex items-center justify-center px-5"
  >
    <edit-routine-form
      v-if="editing"
      :name="editRoutineOldName"
      @submit="updateRoutine"
      @close="editing = false"
    />

    <deletion-confirmation
      v-if="deleting"
      :name="deletingRoutineName"
      @confirm="deleteRoutine(deletingRoutineName), (deleting = false)"
      @cancel="deleting = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { getYYYYMMDD } from "./lib/utils"
import useRoutineStore from "./store/routine"

import AddButton from "./components/AddButton.vue"
import BaseButton from "./components/BaseButton.vue"
import DeletionConfirmation from "./components/DeletionConfirmation.vue"
import EditRoutineForm from "./components/EditRoutineForm.vue"
import InputDatalist from "./components/InputDatalist.vue"
import InputText from "./components/InputText.vue"
import RoutinePill from "./components/RoutinePill.vue"

const routineStore = useRoutineStore()
const { createNewRoutine, deleteRoutine, editRoutine } = useRoutineStore()

const routineName = ref("")
const routineCategory = ref("")
const editing = ref(false)
const editRoutineOldName = ref("")
const deleting = ref(false)
const deletingRoutineName = ref("")
const routineInput = ref(null)

const routinesByCategory = computed(() => {
  return routineStore.categories.map((category) => {
    return {
      category,
      routines: routineStore.routines.filter(
        (routine) => routine.category === category,
      ),
    }
  })
})

const disabled = computed(() => {
  const routineAlreadyExists = routineStore.routines.some(
    (r) => r.name === routineName.value,
  )
  return (
    routineName.value.trim().length === 0 ||
    routineCategory.value.trim().length === 0 ||
    routineAlreadyExists
  )
})

function handleDeleteRoutine(name) {
  deletingRoutineName.value = name
  deleting.value = true
}

function handleEditRoutine(name) {
  editRoutineOldName.value = name
  editing.value = true
}

function updateRoutine({ oldName, newName, category, startDate }) {
  editRoutine({
    newName,
    oldName,
    category,
    startDate,
  })
  editing.value = false
}

function addRoutineToCategory(category) {
  routineCategory.value = category
  routineInput.value.$el.focus()
}

function submit() {
  const today = getYYYYMMDD()
  createNewRoutine({
    name: routineName.value,
    category: routineCategory.value,
    date: today,
  })
  routineName.value = ""
  routineCategory.value = ""
}
</script>
