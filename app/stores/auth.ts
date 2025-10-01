// Utilities
import {defineStore} from 'pinia'
import {ref} from "vue";
import {antToast} from "~/composables/toast";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoading: ref(false),
        token: ref<string>(),
    }),
    actions: {

        async login(modle: any) {
            const {$authAxios} = useNuxtApp();
            try {
                this.isLoading = true;
                // http://10.151.146.245: 5006
                const response = await $authAxios.post(`/auth/login`,
                    modle,
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
                await antToast('Login success', '', 'success')
                console.log(' response.data.accessToken',  response.data.data.getToken.accessToken)
                this.token =  response.data.data.getToken.accessToken;

            } catch (err ) {
                this.isLoading = false;
                await antToast((err as any).message, '', 'error')
            }
        },

    }
})