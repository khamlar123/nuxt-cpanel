<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Welcome to CPanel</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">This is your dashboard.</p>
      </div>
      <!-- Add more cards as needed -->
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>