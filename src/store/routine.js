import { ref } from "vue"
import { defineStore } from "pinia"

export default defineStore(
  "routine",
  () => {
    const routines = ref([])
    const categories = ref([])

    function createNewRoutine({ name, date, category = "Without category" }) {
      routines.value = [
        ...routines.value,
        {
          name: name.trim(),
          startDate: date,
          achievedDays: [],
          category: category.trim(),
        },
      ]
      addCategory(category)
    }

    function addCategory(category) {
      if (categories.value.some((c) => c === category)) {
        return
      }
      categories.value = [...categories.value, category]
    }

    function editRoutine({ oldName, newName, category, startDate }) {
      const idx = routines.value.findIndex((r) => r.name === oldName)
      if (idx !== -1) {
        routines.value[idx] = {
          ...routines.value[idx],
          name: newName,
          category,
          startDate,
        }
      }
    }

    function markRoutineAsDone({ name, date }) {
      const routine = routines.value.find((r) => r.name === name)
      if (!routine) {
        throw new Error(`Routine ${name} doesn't exist!`)
      }
      if (routine.achievedDays.includes(date)) {
        routine.achievedDays = routine.achievedDays.filter((d) => d !== date)
      } else {
        routine.achievedDays = [...routine.achievedDays, date]
      }
    }

    function getDailyRoutines(date) {
      return routines.value
        .filter(({ startDate }) => {
          return date >= startDate
        })
        .map((routine) => {
          return {
            name: routine.name,
            achieved: routine.achievedDays.some((d) => d === date),
            category: routine.category,
          }
        })
    }

    function deleteRoutine(name) {
      const { category } = routines.value.find((r) => r.name === name)
      routines.value = routines.value.filter((routine) => routine.name !== name)
      // We'll remove the category too if no routine is using it
      if (routines.value.filter((r) => r.category === category).length === 0) {
        categories.value = categories.value.filter((c) => c !== category)
      }
    }

    function clearData() {
      localStorage.clear()
      routines.value = []
      categories.value = []
    }

    return {
      // state
      routines,
      categories,

      // getter
      getDailyRoutines,

      // actions
      clearData,
      createNewRoutine,
      deleteRoutine,
      editRoutine,
      markRoutineAsDone,
    }
  },
  { persist: true },
)
