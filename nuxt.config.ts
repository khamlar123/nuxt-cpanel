import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    ssr: false,
    imports: {
        autoImport: true
    },
    devServer: {
        host: '0.0.0.0',
        port: 4200,
    },
    runtimeConfig: {
        public: {
            //base_url: process.env.NUXT_PUBLIC_BASE_URL,

            base_url: ""
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
        '@nuxtjs/color-mode',
        '@ant-design-vue/nuxt',
        '@nuxtjs/google-fonts',
        '@nuxtjs/i18n'
    ],

    // i18n: {
    //     locales: [
    //         {
    //             code: 'en',
    //             name: 'English',
    //             file: 'en.json',
    //         },
    //         {
    //             code: 'la',
    //             name: 'Lao',
    //             file: 'la.json',
    //         },
    //     ],
    //     defaultLocale: 'en',
    //     lazy: true,
    //     langDir: './app/locales',
    // },

    colorMode: {
        preference: 'system',
        fallback: 'light',
        classSuffix: ''
    },
    lucide: {
        namePrefix: 'Icon'
    },
    css: ['~/assets/css/main.css', "~/assets/css/google-fonts.css"],

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
    },
    googleFonts: {
        download: false,
        base64: true,
        outputDir: "app/assets",
        overwriting: true,
        inject: false,
        preload: true,
        stylePath: "css/google-fonts.css",
        fontsDir: "app/assets/fonts",
        fontsPath: "fonts",
        families: {
            Roboto: true,
            "Noto Sans Lao": {
                wght: "100..400",
                regular: "400",
            },
            Ubuntu: true,
        },
    },
})