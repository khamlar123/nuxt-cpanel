import { io } from 'socket.io-client'

export default defineNuxtPlugin(() => {
    const socket = io('http://localhost:3000', {
        path: '/socket.io',
        transports: ['websocket'], // use websocket
        withCredentials: true,
    })


    socket.on('connect', () => {
        console.log('✅ Connected:', socket.id)
    })

    socket.on('connect_error', (err) => {
        console.error('❌ Connection error:', err.message)
    })



    return {
        provide: {
            socket,
        },
    }
})
