<template>
  <header class=" text-white p-4 shadow-sm flex items-center justify-between  dark:border-gray-700  border-b border-gray-200 ">
    <!-- Burger icon for mobile -->
    <button @click="$emit('toggle-sidebar')" >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <h1 class="text-xl font-bold text-gray-600 dark:text-gray-400">Admin Panel</h1>
    <button @click="toggleDark" class="text-white ml-4 cursor-pointer">
      <span v-if="isDark">🌙</span>
      <span v-else>☀️</span>
    </button>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }

}

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
<style scoped lang="scss">

</style>