module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended", // Vue 3 rules
        "plugin:@typescript-eslint/recommended", // if using TS
        "prettier", // disable formatting rules for Prettier
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        // your custom rules
        "vue/multi-word-component-names": "off", // allow single-word component names
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
}
