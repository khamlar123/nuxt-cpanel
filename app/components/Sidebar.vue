<script setup lang="ts">
defineProps<{ isOpen: boolean }>()
</script>

<template>
  <aside
      class=" text-white w-64 h-full p-4 shadow-lg transition-transform duration-300 dark:border-gray-700  border-r border-gray-200 "
  >
    <nav class="space-y-2 text-gray-600 dark:text-gray-400">
      <NuxtLink to="/" class="block hover:bg-gray-700 hover:text-gray-50 p-2 rounded text-red  ">Dashboard</NuxtLink>
      <NuxtLink to="/users" class="block hover:bg-gray-700 hover:text-gray-50 p-2 rounded  ">Users</NuxtLink>
      <NuxtLink to="/import" class="block hover:bg-gray-700 hover:text-gray-50 p-2 rounded ">Import</NuxtLink>
    </nav>
  </aside>
</template>
