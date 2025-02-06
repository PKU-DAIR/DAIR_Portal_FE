import Vue from 'vue'
import App from './App.vue'

import router from "@/router";
import store from "@/store";

import VueFluent from "vfluentdesign";
import "vfluentdesign/lib/index.css";
import "@/style/global.scss";

Vue.use(VueFluent);

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
