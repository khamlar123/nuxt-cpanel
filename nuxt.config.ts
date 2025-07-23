// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    ssr: false,
    imports:{
        autoImport:true
    },
    devServer: {
        host: '0.0.0.0',
        port: 4200,
    },
    runtimeConfig: {
        public: {
            base_url: '',
        }
    },

    plugins: ['~/plugins/axios.ts'],
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/scripts',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxt/icon',
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/color-mode'
    ],
    colorMode: {
        preference: 'system',
        fallback: 'light',
        classSuffix: ''
    },
    lucide: {
        namePrefix: 'Icon'
    },
    css: ['~/assets/css/main.css'],

    vite: {
        optimizeDeps: {
            include: []
        },
        ssr: {
            noExternal: []
        },
        plugins: [
            tailwindcss(),
        ],
    },
    nitro: {
        experimental: {
            wasm: true,
        }
    },
    alias: {},
    ui: {
        fonts: false,
        icons: ['heroicons']
    }
})