// composables/useWindowSize.ts
export const useWindowSize = () => {
  const width = ref(0)
  const height = ref(0)

  const updateSize = () => {
    if (process.client) {
      width.value = window.innerWidth
      height.value = window.innerHeight
    }
  }

  onMounted(() => {
    if (process.client) {
      updateSize()
      window.addEventListener('resize', updateSize)
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', updateSize)
    }
  })

  return { width, height }
}