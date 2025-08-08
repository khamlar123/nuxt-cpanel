<script setup lang="ts">
  const props = defineProps({
    isLoading: Boolean,
    message: String,
  })
</script>

<template>
  <div
      v-if="props.isLoading"
      class="fixed inset-0 bg-gray-800  bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
        class="bg-white dark:bg-black  rounded-lg p-6 flex items-center space-x-3 min-w-[300px]"
    >
      <div
          class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
      ></div>
      <span class="text-gray-900 dark:text-white">{{
          props.message
        }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>