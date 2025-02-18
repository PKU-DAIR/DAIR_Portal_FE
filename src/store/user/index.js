import Vue from "vue";

const user = {
    namespaced: true,
    state: {
        avatar: null,
        info: {
            status: false,
            userid: "",
            role: "",
        },
    },
    getters: {
        info: (state) => {
            return state.info;
        },
    },
    mutations: {
        setAvatar(state, { userId, avatar }) {
            Vue.set(state.avatar, userId, avatar);
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
