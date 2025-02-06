import Vue from "vue";
import VueRouter from "vue-router";

import tool from "./tools";

Vue.use(VueRouter);

const AsyncLoad = tool.AsyncLoad;

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => AsyncLoad(import("@/views/home")),
        meta: {
            title: "创造者官网"
        }
    },
    {
        path: "/team",
        name: "Team",
        component: () => AsyncLoad(import("@/views/team")),
        children: [
            {
                path: "",
                name: "lpc",
                component: () => AsyncLoad(import("@/views/team/cv/lpc"))
            }
        ]
    },
    {
        path: "/dev",
        name: "Dev",
        component: () => AsyncLoad(import("@/views/dev"))
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;