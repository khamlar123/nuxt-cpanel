// Utilities
import {defineStore} from 'pinia'
import type {UserInterface} from "~/interfaces/user.interface";
import {antToast} from "~/composables/toast.js";


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

        async findOne(id: number): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get(`user/user/${id}`,
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
                this.user = response.data.data;
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
        },

        async toggleStatus(employee: string):Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.patch(`user/toggle-status/${employee}`,
                    {
                        headers: {
                            'Content-Type': "application/json",
                           'access-control-allow-origin': '*'
                        }
                    }
                );

                if (!response.data) {
                    this.isLoading = false;
                    return;
                }
                // this.userList = response.data.data;
                // this.masterData = response.data.data;
                this.isLoading = false;
               await antToast('Change status successfully', '', 'success')
            } catch (err) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

        async update(id:number, model: any, router: any): Promise<any> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.patch(`user/update/${id}`,
                    model,
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
                await antToast('Update user successfully', '', 'success')
                this.isLoading = false;
                router.push('/users');
            } catch (err) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

        async create(model: any, router: any): Promise<any> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.post('user',model,
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
                await antToast('Create user successfully', '', 'success')
                router.push({path: '/users'})
            } catch (err) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

    }
})