import Vue from "vue";

const user = {
    namespaced: true,
    state: {
        avatarCache: {},
        info: {
            status: false,
            userid: "",
            role: ["guest"],
        },
    },
    getters: {
        info: (state) => {
            return state.info;
        },
    },
    mutations: {
        setAvatar(state, { userId, avatar }) {
            Vue.set(state.avatarCache, userId, avatar);
        },
        setUserInfo(state, obj) {
            state.info = obj;
        },
        clearInfo(state) {
            state.info.status = false;
            state.info.userid = "";
        }
    },
    actions: {

    }

};

export default user;
