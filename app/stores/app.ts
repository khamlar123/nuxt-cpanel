// Utilities
import {defineStore} from 'pinia'
import {ref} from "vue";
import {
    CalendarIcon,
    ChartBarIcon,
    CogIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    FolderIcon,
    HomeIcon, ServerIcon,
    UserIcon
} from "@heroicons/vue/24/outline";

export const useAppStore = defineStore('app', {
    state: () => ({
        isMiniSidebar : ref(false),
        navItems : ref([
            { name: 'Dashboard', path: '/', icon: HomeIcon },
            { name: 'Users', path: '/users', icon: UserIcon },
            { name: 'Files', path: '/files', icon: FolderIcon },
            { name: 'Email', path: '/email', icon: EnvelopeIcon },
            { name: 'Statistics', path: '/stats', icon: ChartBarIcon },
            { name: 'Settings', path: '/settings', icon: CogIcon },
            { name: 'Documents', path: '/docs', icon: DocumentTextIcon },
            { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
            { name: 'Server', path: '/server', icon: ServerIcon }
        ])
    }),
    actions: {
        async toggleSidebar():Promise<void> {
            console.log('im here')
            this.isMiniSidebar = !this.isMiniSidebar
        }

    }
})