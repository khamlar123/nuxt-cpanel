// Utilities
import {defineStore} from 'pinia'
import type {UserInterface} from "~/interfaces/user.interface";


export const useUserStore = defineStore('user', {
    state: () => ({
        isLoading: ref<boolean>(false),
        masterData: ref<UserInterface[]>([]),
        userList: ref<UserInterface[]>([]),
        user: ref<UserInterface>(),
    }),
    actions: {

        async find(): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get('user',
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
                this.userList = response.data.data;
                this.masterData = response.data.data;
                this.isLoading = false;
            } catch (err) {
                this.isLoading = false;
            }
        },

        async search(kw: string): Promise<void> {
            try {
                let searchData: any;
                if (kw) {
                    searchData =
                        this.masterData?.filter((f: any) =>
                            `${f.email}`
                                .toLowerCase()
                                .includes(kw.toLowerCase())
                        ) || [];

                } else {
                    searchData = this.masterData || [];
                }

                this.userList = searchData;
            } catch (err) {
               this.userList = [];
            }
        }

    }
})