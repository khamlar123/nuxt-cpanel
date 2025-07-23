<template>
  <header class="flex items-center justify-between h-16 px-6  border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <button @click="store.toggleSidebar" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <Bars3Icon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </button>

    <div class="flex items-center space-x-4">
      <ColorModeButton />
    </div>
  </header>
</template>
<script setup lang="ts">
import {
  Bars3Icon,
} from '@heroicons/vue/24/outline'
import {useAppStore} from "~/stores/app";

const store = useAppStore()
</script>
<style scoped lang="scss">

</style>