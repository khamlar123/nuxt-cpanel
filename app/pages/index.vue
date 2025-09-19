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

  <div class="p-6">
    <h1 class="text-xl font-bold">Nuxt + NestJS Socket.IO</h1>

    <div class="mt-4">
      <input
          v-model="message"
          @keyup.enter="sendMessage"
          placeholder="Type a message"
          class="border p-2"
      />
      <button @click="sendMessage" class="ml-2 bg-blue-600 text-white px-3 py-1 rounded">
        Send
      </button>

      <v-btn @click="chatById">test</v-btn>
    </div>

    <ul class="mt-4">
      <li v-for="(msg, i) in messages" :key="i">{{ msg.message }}</li>
    </ul>
  </div>


</template>

<script setup lang="ts">
const { t,locale } = useI18n()

export interface UserInterface {
  "branch_id": string
  "email": string
    "employee_id": string
    "id": number
    "is_active": boolean,
    "is_admin": boolean
    "name": string
    "password": string
    "phone": string
    "role": string

}

function changeLang(lang) {
  locale.value = lang
}
definePageMeta({
  layout: 'default'
})

import { ref, onMounted, onUnmounted } from 'vue'

const { $socket } = useNuxtApp()

const message = ref('')
const messages = ref<{name: string, message: string}[]>([])

onMounted(() => {
  $socket.on('text-chat', (msg) => {
    console.log('📩 New chat:', msg)
    messages.value.push(msg)
  })

  $socket.emit('get_users', (response: UserInterface) => {
    console.log('✅ User data from server:', response)
  })

  $socket.emit('join-room', { userId: 1, title: 'test', message: "test" }, (response: any) => {
    console.log('join room', response)
  })

  $socket.on('private-message', (msg) => {
    console.log('📩 New private message:', msg)
  })



})

onUnmounted(() => {
  $socket.off('text-chat')
  $socket.off('get_users')
})

const chatById = () => {

  // $socket.to(`chat-user-1`).emit('chat-user-1', 'user chat to admin ecosystem.config.cjs')
}

const sendMessage = () => {
  if (message.value.trim()) {
    const messageObject = {
      name: 'user1',
      message: message.value,
    }
    $socket.emit('text-chat', messageObject)
    message.value = ''
  }
}

</script>