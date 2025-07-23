// Utilities
import {defineStore} from 'pinia'
import type {permissionInterface} from "~/interfaces/permission.interface";

export const useRoleStore = defineStore('role', {
    state: () => ({
        isLoading : ref(false),
        permissionList: ref<permissionInterface[]>([]),

    }),
    actions: {
        async findPermission():Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get('user/permission',
                    {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    }
                );

                if (!response.data) {
                    this.isLoading = false;
                    return;
                }
                this.permissionList = response.data.data;
                this.isLoading = false;
            } catch (err ) {
                this.isLoading = false;
            }
        },

        async permissionToggle(id: number):Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.patch(`user/permission/toggle-status/${id}`,
                    {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    }
                );

                if (!response.data) {
                    this.isLoading = false;
                    return;
                }

                this.isLoading = false;
            } catch (err ) {
                this.isLoading = false;
            }
        },

    }
})