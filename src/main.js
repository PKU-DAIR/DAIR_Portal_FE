import Vue from 'vue'
import App from './App.vue'

import router from "@/router";
import store from "@/store";

import Vuex from "vuex";
import VFluent from "vfluentdesign";
import "vfluentdesign/lib/index.css";
import "@/style/global.scss";

import custom_axios from "@/api/config.js";

Vue.use(VFluent, Vuex);

import PowerEditor from "@creatorsn/powereditor";

import "@creatorsn/powereditor/lib/powereditor.css";
Vue.use(PowerEditor);

Vue.config.productionTip = false

//beforeEach//
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

new Vue({
    router,
    store,
    beforeCreate() {
        Vue.prototype.$axios = custom_axios;
        Vue.prototype.$Go = str => {
            this.$router.push(str);
        };
        Vue.prototype.$Back = () => {
            this.$router.back();
        };
        Vue.prototype.$Jump = str => {
            window.open(str);
        };
    },
    render: h => h(App),
}).$mount('#app')
