<template>
  <div class="relative pb-16">
    <router-view />
    <div
      class="fixed w-full bottom-0 right-0 p-3 gap-4 flex bg-white/50 sm:justify-end justify-between shadow-inner"
    >
      <router-link
        v-if="routineStore.routines?.length > 0"
        :class="linkClasses"
        :to="today"
      >
        {{ $t("goToToday") }}
      </router-link>

      <router-link v-if="$route.name === 'day'" :class="linkClasses" to="/">
        <template v-if="isDesktop">{{ $t("manageRoutines") }}</template>
        <template v-else>{{ $t("routines") }}</template>
      </router-link>

      <base-button theme="danger" @click="routineStore.clearData">
        <template v-if="isDesktop">{{ $t("deleteAllData") }}</template>
        <template v-else>{{ $t("delete") }}</template>
      </base-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { getYYYYMMDD } from "./lib/utils"
import { useScreenSize } from "./composables/useScreenSize"
import useRoutineStore from "./store/routine"
import BaseButton from "./components/BaseButton.vue"

const { isDesktop } = useScreenSize()
const { t } = useI18n()
const routineStore = useRoutineStore()

const linkClasses =
  "rounded bg-primary-600 hover:primary-400 text-white px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
const today = computed(() => {
  return `/day/${getYYYYMMDD()}`
})

onMounted(() => {
  document.title = t("appTitle")
})
</script>
