import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        screenWidth: 999999999
    },
    mutations: {
        setScreenWidth (state, obj) {
            state.screenWidth = obj;
        }
    },
    actions: {},
    modules: {
        
    }
});