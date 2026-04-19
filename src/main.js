import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@/router";

import VueFluent from "@creatorsn/vfluent3";
import "@creatorsn/vfluent3/style.css";

import PowerEditor from "@creatorsn/powereditor3";
import "@creatorsn/powereditor3/powereditor3.css";

import customAxios, { serverURL } from "@/api/config";
import { useApp } from "@/stores/useApp";

import apiPlugin from '@/api'

const app = createApp(App);

app.use(VueFluent);
app.use(PowerEditor);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.config.globalProperties.$axios = customAxios;
app.config.globalProperties.$server = serverURL;
app.config.globalProperties.$Go = (str) => {
    router.push(str);
};
app.config.globalProperties.$Back = () => {
    router.back();
};
app.config.globalProperties.$Jump = (str) => {
    window.open(str);
};
app.config.globalProperties.local = (text) => {
    const appStore = useApp();
    return appStore.local(text);
};

app.use(apiPlugin);
app.mount("#app");
