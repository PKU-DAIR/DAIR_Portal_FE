import Vue from "vue";
import VueRouter from "vue-router";

import tool from "./tools";

import Login from "./Login";
import Admin from "./Admin";
import Team from "./Team";
import Pub from "./Pub";
import News from "./News";
import Projs from "./Projs";

Vue.use(VueRouter);

const AsyncLoad = tool.AsyncLoad;

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => AsyncLoad(import("@/views/client/home")),
        meta: {
            title: "PKU-DAIR"
        }
    },
    Login,
    Team,
    Pub,
    News,
    Projs,
    Admin,
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