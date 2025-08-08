<template>
  <button
      @click="toggleColorMode"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      :aria-label="`Toggle ${colorMode.preference === 'dark' ? 'light' : 'dark'} mode`"
  >
    <MoonIcon v-if="colorMode.value === 'dark'" class="w-5 h-5 text-yellow-400" />
    <SunIcon v-else class="w-5 h-5 text-gray-700" />
  </button>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'

const colorMode = useColorMode()

//  setInterval(() => {
//    toggleColorMode()
// }, 500) // Every 1 second

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>