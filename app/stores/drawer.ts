// store/drawer.ts
export const useDrawerStore = defineStore('drawer', () => {
    const isOpen = ref(false)
    const isMobile = ref(false)

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    const close = () => {
        isOpen.value = false
    }

    const open = () => {
        isOpen.value = true
    }

    const setMobile = (mobile: boolean) => {
        isMobile.value = mobile
    }

    return {
        isOpen,
        isMobile,
        toggle,
        close,
        open,
        setMobile
    }
})