// Utilities
import {defineStore} from 'pinia'
import type {permissionInterface} from "~/interfaces/permission.interface";
import type {roleInterface} from "~/interfaces/role.interface";
import type {branchInterface} from "~/interfaces/branch.interface";
import {antToast} from "~/composables/toast";

export const useRoleStore = defineStore('role', {
    state: () => ({
        isLoading : ref(false),
        masterPermission:ref<permissionInterface[]>([]),
        permissionList: ref<permissionInterface[]>([]),
        permission: ref<permissionInterface>(),
        masterRole: ref<roleInterface[]>([]),
        roleList: ref<roleInterface[]>([]),
        role: ref<roleInterface>(),
        branchList: ref<branchInterface[]>([])
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
                this.masterPermission = response.data.data;
                this.isLoading = false;
            } catch (err ) {

                this.isLoading = false;
                await antToast(err.message, '', 'error')
            }
        },

        async findOnePermission(id: string): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get(`/user/permission/${id}`,
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
                this.permission = response.data.data;
                this.isLoading = false;
            } catch (err ) {

                this.isLoading = false;
                await antToast(err.message, '', 'error')
            }
        },

        async findRole():Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get('/user/roles',
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
                this.roleList = response.data.data;
                this.masterRole = response.data.data;
                this.isLoading = false;
            } catch (err ) {

                this.isLoading = false;
                await antToast(err.message, '', 'error')
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
                await antToast('Change status successfully', '', 'success')
            } catch (err) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

        async updatePermission(id: number, model: any, router: any):Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.patch(`user/permission/update/${id}`,
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

                this.isLoading = false;
                await antToast('Update permission successfully', '', 'success')
                router.push({path: '/permission'})
            } catch (err) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

        async searchPermission(kw: string):Promise<void> {
            try {
                let searchData: any;
                if (kw) {
                    searchData =
                        this.masterPermission?.filter((f: any) =>
                            `${f.name}`
                                .toLowerCase()
                                .includes(kw.toLowerCase())
                        ) || [];

                } else {
                    searchData = this.masterPermission || [];
                }

                this.permissionList = searchData;
            } catch (err) {
                this.permissionList = [];
            }
        },

        async find(): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get('user/roles',
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
                this.roleList = response.data.data;
                this.isLoading = false;
            } catch (err ) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

        async branch(): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get('branch',
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
                this.branchList = response.data.data;
                this.isLoading = false;
            } catch (err ) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

        async createPermission(model: any, router: any): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.post('/user/create-permission',
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

                this.isLoading = false;
                await antToast('Create permission successfully', '', 'success')
                router.push('/setting')
            } catch (err ) {

                this.isLoading = false;
                await antToast(err.message, '', 'error')
            }
        },

        async createRole(model: any, router: any): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.post('/user/create-role',
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

                this.isLoading = false;
                await antToast('Create role successfully', '', 'success')
                router.push('/role')
            } catch (err ) {

                this.isLoading = false;
                await antToast(err.message, '', 'error')
            }
        },

        async findOneRole(id: number ): Promise<void> {
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.get(`/user/role/${id}`,
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
                this.role = response.data.data;
            } catch (err ) {

                this.isLoading = false;
                await antToast(err.message, '', 'error')
            }
        },

        async updateRole(id: number, model: any, router: any): Promise<void>{
            const {$axios} = useNuxtApp();
            try {

                this.isLoading = true;
                const response = await $axios.patch(`/user/role/update/${id}`,
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

                this.isLoading = false;
                await antToast('Update role successfully', '', 'success')
                router.push({path: '/role'})
            } catch (err) {
                await antToast(err.message, '', 'error')
                this.isLoading = false;
            }
        },

    }
})