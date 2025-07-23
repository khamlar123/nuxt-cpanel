<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div
        :class="[
        'flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out',
        isMiniSidebar ? 'w-20' : 'w-64'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <span v-if="!isMiniSidebar" class="text-xl font-bold dark:text-white">CPanel</span>
        <span v-else class="text-xl font-bold dark:text-white">CP</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto">
        <ul class="space-y-1 p-2">
          <li v-for="item in navItems" :key="item.name">
            <NuxtLink
                :to="item.path"
                class="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{
                'bg-gray-100 dark:bg-gray-700': $route.path === item.path,
                'justify-center': isMiniSidebar
              }"
            >
              <component :is="item.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span v-if="!isMiniSidebar" class="ml-3 dark:text-white">{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Toggle sidebar button -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
            @click="toggleSidebar"
            class="flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronDoubleLeftIcon v-if="!isMiniSidebar" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <ChevronDoubleRightIcon v-else class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span v-if="!isMiniSidebar" class="ml-3 dark:text-white">Collapse</span>
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bars3Icon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div class="flex items-center space-x-4">
          <ColorModeButton />
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  UserIcon,
  CogIcon,
  DocumentTextIcon,
  ChartBarIcon,
  EnvelopeIcon,
  CalendarIcon,
  FolderIcon,
  ServerIcon
} from '@heroicons/vue/24/outline'

const isMiniSidebar = ref(false)

const toggleSidebar = () => {
  isMiniSidebar.value = !isMiniSidebar.value
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Users', path: '/users', icon: UserIcon },
  { name: 'Files', path: '/files', icon: FolderIcon },
  { name: 'Email', path: '/email', icon: EnvelopeIcon },
  { name: 'Statistics', path: '/stats', icon: ChartBarIcon },
  { name: 'Settings', path: '/settings', icon: CogIcon },
  { name: 'Documents', path: '/docs', icon: DocumentTextIcon },
  { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
  { name: 'Server', path: '/server', icon: ServerIcon }
]
</script>