import axios, {type AxiosInstance} from "axios";

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();
    const authAxiosInstance: AxiosInstance = axios.create({
        baseURL: config.public.auth_base_url,
        headers: {
            'Content-Type': "application/json",
            'access-control-allow-origin': '*'
        }
    })

    const importAxiosInstance: AxiosInstance = axios.create({
        baseURL: config.public.import_base_url,
        headers: {
            'Content-Type': "application/json",
            'access-control-allow-origin': '*'
        }
    })

    return {
        provide: {
            authAxios: authAxiosInstance,
            importAxios: importAxiosInstance,
        }
    }

})
