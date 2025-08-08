<script setup lang="ts">
import {useAppStore} from "~/stores/app";
import {ref} from 'vue';
import {useTheme} from '@/composables/useTheme'
import type {NavigationMenuItem} from '@nuxt/ui'

const store = useAppStore()
const {theme} = useTheme()
const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Dashboard',
      icon: 'ic:baseline-dashboard',
      to: '/'
    },
    {
      label: 'Import',
      icon: 'ic:baseline-cloud-download',
      to: '/import'
    },
    {
      label: 'Users',
      icon: 'ic:round-supervised-user-circle',
      to: '/users'
    },
    {
      label: 'Settings',
      icon: 'ic:baseline-settings',
      active: false,
      defaultOpen: false,
      children: [
        {
          label: 'Permission',
          icon: 'material-symbols:article-person',
          description: 'Use NuxtLink with superpowers.',
          to: '/permission'
        },
        {
          label: 'Role',
          icon: 'material-symbols:add-moderator',
          description: 'Show a horizontal bar to indicate task progression.',
          to: '/role'
        }
      ]
    }
  ],
  // [
  //   {
  //     label: 'GitHub',
  //     icon: 'i-simple-icons-github',
  //     badge: '3.8k',
  //     to: 'https://github.com/nuxt/ui',
  //     target: '_blank'
  //   },
  //   {
  //     label: 'Help',
  //     icon: 'i-lucide-circle-help',
  //     disabled: true
  //   }
  // ]
])

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
      <span v-if="!store.isMiniSidebar" class="text-xl font-bold dark:text-white">Dashboard</span>
      <span v-else class="text-xl font-bold dark:text-white">DB</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto">
      <div :class="[theme]">
        <!--        <a-menu-->
        <!--            mode="inline"-->
        <!--            :items="items"-->
        <!--            @click="handleMenuSelect"-->
        <!--            class="custom-menu"-->
        <!--        >-->
        <!--        </a-menu>-->
        <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-full"/>
      </div>
    </nav>

  </div>
</template>

<style scoped>

</style>
