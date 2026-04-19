import { createRouter, createWebHashHistory } from "vue-router";

import Login from "./Login";
import Admin from "./Admin";
import Team from "./Team";
import Pub from "./Pub";
import News from "./News";
import Projs from "./Projs";

import tool from "@/router/tools.js";

const AsyncLoad = tool.AsyncLoad;



const routes = [
    {
        path: "/",
        name: "Home",
        component: AsyncLoad(() => import("@/views/client/home/index.vue")),
        meta: {
            title: "PKU-DAIR",
        },
    },
    Login,
    Team,
    Pub,
    News,
    Projs,
    Admin
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;




