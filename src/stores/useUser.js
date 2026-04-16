import { defineStore } from "pinia";

const defaultInfo = () => ({
    status: false,
    userid: "",
    role: "",
});

export const useUser = defineStore("useUser", {
    state: () => ({
        avatar: null,
        info: defaultInfo(),
    }),
    actions: {
        setAvatar(avatar) {
            this.avatar = avatar;
        },
        setUserInfo(obj) {
            this.info = obj;
        },
        clearInfo() {
            this.info = defaultInfo();
            this.avatar = null;
        },
    },
});


