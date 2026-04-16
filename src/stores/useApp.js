import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useApp = defineStore("useApp", () => {
    const screenWidth = ref(999999999);
    const config = reactive({
        language: "en",
    });
    const i18n = ref({});

    const local = (text) => {
        const result = i18n.value[text];
        if (!result) {
            return text;
        }
        return result[config.language];
    };

    const setScreenWidth = (width) => {
        screenWidth.value = width;
    };

    const reviseI18N = (nextI18N) => {
        i18n.value = nextI18N;
    };

    return {
        screenWidth,
        config,
        i18n,
        local,
        setScreenWidth,
        reviseI18N,
    };
});


