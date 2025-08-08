// composables/useTheme.ts
import { ref } from 'vue'

export const useTheme = () => {
    const theme = ref<string>('') // default

    const toggleTheme = () => {
        theme.value = localStorage.getItem('theme'!) ?? 'dark';
    }

    return { theme, toggleTheme }
}
