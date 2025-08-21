// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt(
    {
        files: ["**/*.js", "**/*.vue", "**/*.ts"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
        },
        plugins: {
            vue,
            "@typescript-eslint": tseslint,
        },
        rules: {
            "vue/multi-word-component-names": "off",
            "no-console": "warn",
            "no-debugger": "warn",
        },
    },
)
