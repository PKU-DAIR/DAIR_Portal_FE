import Vue from "vue";
import Vuex from "vuex";

import user from './user';
import Theme from "./Theme";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        screenWidth: 999999999,
        config: {
            language: 'en'
        },
        i18n: {}
    },
    mutations: {
        setScreenWidth(state, obj) {
            state.screenWidth = obj;
        },
        reviseI18N(state, i18n) {
            state.i18n = i18n
        }
    },
    actions: {},
    getters: {
        local: state => text => {
            let result = state.i18n[text];
            if (!result)
                return text;
            return result[state.config.language];
        }
    },
    modules: {
        user,
        Theme
    }
});