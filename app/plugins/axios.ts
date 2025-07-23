import axios, {type AxiosInstance} from "axios";

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();
    const axiosInstance: AxiosInstance = axios.create({
        baseURL: config.public.base_url,
        headers: {
            'Content-Type': "application/json"
        }
    })


    return {
        provide: {
            axios: axiosInstance
        }
    }

})
