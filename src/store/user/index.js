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
        setAvatar(state, avatar) {
            state.avatar = avatar;
        },
        setUserInfo(state, obj) {
            state.info = obj;
        },
        clearInfo(state) {
            state.info.status = false;
            state.info.userid = "";
            state.avatar = null;
        }
    },
    actions: {

    }

};

export default user;
