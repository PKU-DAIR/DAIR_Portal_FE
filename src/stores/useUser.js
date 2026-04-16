import { defineStore } from "pinia";
import { ref } from "vue";

const defaultInfo = () => ({
    status: false,
    userid: "",
    role: "",
});

export const useUser = defineStore("useUser", () => {
    const avatar = ref(null);
    const info = ref(defaultInfo());

    const setAvatar = (nextAvatar) => {
        avatar.value = nextAvatar;
    };

    const setUserInfo = (obj) => {
        info.value = obj;
    };

    const clearInfo = () => {
        info.value = defaultInfo();
        avatar.value = null;
    };

    return {
        avatar,
        info,
        setAvatar,
        setUserInfo,
        clearInfo,
    };
});


