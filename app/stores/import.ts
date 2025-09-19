// Utilities
import {defineStore} from 'pinia'
import {ref} from "vue";
import {antToast} from "~/composables/toast";
import type {ImportDatesInterface} from "~/interfaces/import-dates.interface";

export const useImportStore = defineStore('import', {
    state: () => ({
        isLoading: ref(false),
        dates: ref<ImportDatesInterface>(),
    }),
    actions: {

        async checkImport() {
            const {$axios} = useNuxtApp();
            try {
                this.isLoading = true;

                const token = useCookie('token');
                const response = await $axios.get(`/import/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token.value}`,
                            'Content-Type': "application/json"
                        }
                    }
                );
                if (!response.data) {
                    this.isLoading = false;
                    return;
                }
                this.isLoading = false;
                this.dates = response.data.data;
            } catch (err ) {
                this.isLoading = false;
                await antToast((err as any).message, '', 'error')
            }
        },

        async importLoan(start: string, end: string, url:string): Promise<void> {
            const {$axios} = useNuxtApp();
            try {
                this.isLoading = true;
                const token = useCookie('token');
                const response = await $axios.post(`/import/${url}?start=${start}&end=${end}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token.value}`,
                            'Content-Type': "application/json"
                        }
                    }
                );
                if (!response.data) {
                    this.isLoading = false;
                    return;
                }
                this.isLoading = false;
                await antToast('Import loan successfully', '', 'success');
               await this.checkImport();
            } catch (err ) {
                this.isLoading = false;
                await antToast((err as any).message, '', 'error')
            }
        },
    }
})