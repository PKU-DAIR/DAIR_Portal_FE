import { defineStore } from "pinia";

export const useApp = defineStore("useApp", {
    state: () => ({
        screenWidth: 999999999,
        config: {
            language: "en",
        },
        i18n: {},
    }),
    getters: {
        local: (state) => (text) => {
            const result = state.i18n[text];
            if (!result) {
                return text;
            }
            return result[state.config.language];
        },
    },
    actions: {
        setScreenWidth(width) {
            this.screenWidth = width;
        },
        reviseI18N(i18n) {
            this.i18n = i18n;
        },
    },
});


