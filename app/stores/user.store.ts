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
              const {$importAxios} = useNuxtApp();
            try {

                this.isLoading = true;
                const token = useCookie('token');
                const response = await $importAxios.get('user',
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
                this.userList = response.data.data;
                this.masterData = response.data.data;
                this.isLoading = false;
            } catch (err: any) {
                this.isLoading = false;
            }
        },

        async findOne(id: number): Promise<void> {
              const {$importAxios} = useNuxtApp();
            try {

                this.isLoading = true;
                const token = useCookie('token');
                const response = await $importAxios.get(`user/user/${id}`,
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
                this.user = response.data.data;
                this.isLoading = false;
            } catch (err: any) {
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
            } catch (err: any) {
               this.userList = [];
            }
        },

        async toggleStatus(employee: string):Promise<void> {
              const {$importAxios} = useNuxtApp();
            try {

                this.isLoading = true;
                const token = useCookie('token');
                const response = await $importAxios.patch(`user/toggle-status/${employee}`,
                    {
                        headers: {
                            'Content-Type': "application/json",
                            Authorization: `Bearer ${token.value}`,
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
            } catch (err: any) {
                await antToast(err.message , '', 'error')
                this.isLoading = false;
            }
        },

        async update(id:number, model: any, router: any): Promise<any> {
              const {$importAxios} = useNuxtApp();
            try {

                this.isLoading = true;
                const token = useCookie('token');
                const response = await $importAxios.patch(`user/update/${id}`,
                    model,
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
                this.userList = response.data.data;
                this.masterData = response.data.data;
                await antToast('Update user successfully', '', 'success')
                this.isLoading = false;
                router.push('/users');
            } catch (err: any) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

        async create(model: any, router: any): Promise<any> {
              const {$importAxios} = useNuxtApp();
            try {

                this.isLoading = true;
                const token = useCookie('token');
                const response = await $importAxios.post('user',model,
                    {
                        headers: {
                            'Content-Type': "application/json",
                            Authorization: `Bearer ${token.value}`,
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
            } catch (err: any) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

    }
})