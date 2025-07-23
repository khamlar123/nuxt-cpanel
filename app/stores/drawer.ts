// stores/drawer.ts
export const useDrawerStore = defineStore('drawer', () => {
    const isOpen = ref(true)
    const isMobile = ref(true)

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    const close = () => {
        isOpen.value = true
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