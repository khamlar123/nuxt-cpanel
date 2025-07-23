<script setup lang="ts">
import {useAppStore} from "~/stores/app";
const store = useAppStore()
</script>

<template>
  <div
      :class="[
        'flex flex-col  shadow-lg transition-all duration-300 ease-in-out  border-r border-gray-200 dark:border-gray-700 shadow-sm',
        store.isMiniSidebar ? 'w-20' : 'w-64'
      ]"
  >
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 ">
      <span v-if="!store.isMiniSidebar" class="text-xl font-bold dark:text-white">CPanel</span>
      <span v-else class="text-xl font-bold dark:text-white">CP</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto">
      <ul class="space-y-1 p-2">
        <li v-for="item in store.navItems" :key="item.name">
          <NuxtLink
              :to="item.path"
              class="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              :class="{
                'bg-gray-200 dark:bg-gray-700': $route.path === item.path,
                'justify-center':  store.isMiniSidebar
              }"
          >
            <component :is="item.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span v-if="! store.isMiniSidebar" class="ml-3 dark:text-white">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Toggle sidebar button -->
<!--    <div class="p-4 border-t border-gray-200 dark:border-gray-700">-->
<!--      <button-->
<!--          @click="store.toggleSidebar"-->
<!--          class="flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"-->
<!--      >-->
<!--        <ChevronDoubleLeftIcon v-if="! store.isMiniSidebar" class="w-5 h-5 text-gray-500 dark:text-gray-400" />-->
<!--        <ChevronDoubleRightIcon v-else class="w-5 h-5 text-gray-500 dark:text-gray-400" />-->
<!--        <span v-if="! store.isMiniSidebar" class="ml-3 dark:text-white">Collapse</span>-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>
