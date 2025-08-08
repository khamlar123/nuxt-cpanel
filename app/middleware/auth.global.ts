export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = useCookie('token').value // or check your auth logic

    if (!isLoggedIn && to.path !== '/login') {
        return navigateTo('/login')
    }
})
