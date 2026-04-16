import { createRouter, createWebHistory } from "vue-router";

import Login from "./Login";
import Admin from "./Admin";
import Team from "./Team";
import Pub from "./Pub";
import News from "./News";
import Projs from "./Projs";

import home from "@/views/client/home/index.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: home,
        meta: {
            title: "PKU-DAIR",
        },
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
        component: () => import("@/views/dev/index.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;




