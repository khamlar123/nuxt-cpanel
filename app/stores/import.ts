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
            const {$importAxios} = useNuxtApp();
            try {
                this.isLoading = true;

                const token = useCookie('token');
                // http://10.151.146.245:5005
                const response = await $importAxios.get(`/import`,
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
            const {$importAxios} = useNuxtApp();
            try {
                this.isLoading = true;
                const token = useCookie('token');
                console.log('token', token.value)
                const response = await $importAxios.post(`/import/${url}?start=${start}&end=${end}`,
                    {},
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